const {formidable} = require('formidable');
const slugify = require('slugify');
const {stripHtml} = require('string-strip-html');
const _ = require('lodash');
const fs = require('fs');
const { httpResponse, smartTrim } = require('../utils');
const { ERROR, CHARACTER_LENGTH, MESSAGE } = require('../constant');
const { Blog, Category, Tag } = require('../model');
const { APP_NAME } = require('../config');
const { default: mongoose } = require('mongoose');

module.exports = {
    create: async(req, res) => {
        let form = formidable({ keepExtensions: true });
        try {
            const [fields, files] = await form.parse(req);

            if(!fields ) {
                return httpResponse(res, 404, "input is missing", ERROR);
            }

            if(!fields?.title[0]?.length){
                return httpResponse(res, 400, "title is required", ERROR);
            }
            const title = fields?.title?.length && fields.title[0];
            if(fields?.body[0]?.length < 200){
                return httpResponse(res, 400, "body content is too short", ERROR);
            }          
            const body = fields.body[0];
            if(!fields?.categories?.length){
                return httpResponse(res, 400, "At least one category is required", ERROR);
            }
            const categories = JSON.parse(fields.categories[0]);  
            if(!fields?.tags.length){
                return httpResponse(res, 400, "At least one tag is required", ERROR);
            }
            const tags = JSON.parse(fields.tags[0]);
            let blog = new Blog();
            blog.title = title;
            blog.body = body;
            blog.excerpt = smartTrim(body, CHARACTER_LENGTH.excerpt.length, ' ', ' ...');
            blog.slug = slugify(title).toLowerCase();
            blog.metaTitle = `${title} | ${APP_NAME}`;
            blog.metaDescription = stripHtml(body.substring(0, 160)).result;
            blog.postedBy = req.auth?._id;
            blog.categories = categories;
            blog.tags = tags;
            if(files?.photo){
                if(files.photo?.size > 10000000){
                    return httpResponse(res, 400, "Image should be less than 1MB in size", ERROR);
                }
                blog.photo.data = fs.readFileSync(files.photo[0].filepath);
                blog.photo.contentType = files.photo[0].mimetype; 
            }
            try {
                const result = await blog.save();
                return httpResponse(res, 201, result); 
            } catch (error) {
                return httpResponse(res, 400, error.message, ERROR);
            }
        }catch(error){
            return httpResponse(res, 500, error.message, ERROR);
        }
    },
    list: async(req, res) => {
        try {
           const response = await Blog.find()
                            .populate('categories', '_id name slug')
                            .populate('tags', '_id name slug')
                            .populate('postedBy', '_id name username')
                            .select('_id title slug excerpt categories tags postedBy createdAt updatedAt');
           if(response?.length){
               return httpResponse(res, 200, response);
           }else{
               return  httpResponse(res, 200, 'No blog exist', MESSAGE);
           }
        } catch (error) {
               return httpResponse(res, 500, error.message, ERROR);
        }
        
    },
    listBlogsCategoriesTags: async(req, res) => {
        let limit = req.body?.limit ? parseInt(req.body.limit) : 100;
        let skip = req.body?.skip ? parseInt(req.body.skip) : 0;
        try {
            let blogs = await Blog.find()
                                    .populate('categories', '_id name slug')
                                    .populate('tags', '_id name slug')
                                    .populate('postedBy', '_id name username profile')
                                    .sort({createdAt: -1})
                                    .skip(skip)
                                    .limit(limit)
                                    .select('_id title slug excerpt categories tags postedBy createdAt updatedAt');
            if(blogs?.length){
                const categories = await Category.find();
                if(categories?.length){
                    const tags = await Tag.find();
                    if(tags?.length){
                        return httpResponse(res, 200, {blogs, categories, tags, size: blogs.length})
                    }
                }
            }else{
                return httpResponse(res, 200, "There is no blog", MESSAGE)
            }
        } catch (error) {
            return httpResponse(res, 500, error.message, ERROR);
        }
    },
    read: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        try {
            const blog = await Blog.findOne({slug})
                                .populate('categories', '_id name slug')
                                .populate('tags', '_id name slug')
                                .populate('postedBy', '_id name username')
                                .select('_id title body slug metaTitle metaDescription photo categories tags postedBy createdAt updatedAt');
            if(blog){
                return httpResponse(res, 200, blog);
            }else{
                return httpResponse(res, 404, "Blog not found", ERROR);
            }
        } catch (error) {
            return httpResponse(res, 500, error.message, ERROR);
        }
    },
    delete: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        try {
            const response = await Blog.findOneAndDelete({slug});
            if(response){
                return httpResponse(res, 200, "Blog deleted successfully", MESSAGE);
            }else{
                return httpResponse(res, 404, "Blog not found", ERROR);
            }
        } catch (error) {
            return httpResponse(res, 500, error.message, ERROR);
        }
    },
    update: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        let currentBlog = await Blog.findOne({slug});
        if(!currentBlog){
            return httpResponse(res, 404, 'Blog not found', ERROR);
        }
        let form = formidable({ keepExtensions: true });
        try {
            const [fields, files] = await form.parse(req);
            let currentSlug = currentBlog.slug;
          // currentBlog = _.merge(currentBlog, fields);
            currentBlog.slug = currentSlug;

            if(!fields ) {
                return httpResponse(res, 404, "input is missing", ERROR);
            }
            if(fields?.title && fields?.title?.length > 0){
                currentBlog.title = fields.title[0];
            }
            if(fields?.body && fields.body?.length > 0 ){
                const body = fields.body[0];
                if(!body || body.length < 200 ){
                    return httpResponse(res, 400, "body content is too short", ERROR);
                }
                currentBlog.excerpt = smartTrim(body, CHARACTER_LENGTH.excerpt.length, ' ', ' ...');
                currentBlog.metaDescription = stripHtml(body.subString(0, CHARACTER_LENGTH.metaDescription.max));
            }
            if(fields?.categories && fields.categories?.length > 0 ){
                const categories = JSON.parse(fields.categories[0]);
                if(!categories || categories.length === 0 ){
                    return httpResponse(res, 400, "At least one category is required", ERROR);
                }
                currentBlog.categories = categories;
            }
            if(fields?.tags && fields.tags?.length > 0 ){
                const tags = JSON.parse(fields.tags[0]);
                if(!tags || tags.length === 0 ){
                    return httpResponse(res, 400, "At least one tag is required", ERROR);
                }
                currentBlog.tags = tags;
            }
            
            if(files?.photo){
                if(files.photo?.size > 10000000){
                    return httpResponse(res, 400, "Image should be less than 1MB in size", ERROR);
                }
                currentBlog.photo.data = fs.readFileSync(files.photo[0].filepath);
                currentBlog.photo.contentType = files.photo[0].mimetype; 
            }
            try {
                const result = await currentBlog.save();
                return httpResponse(res, 200, result); 
            } catch (error) {
                return httpResponse(res, 400, error, ERROR);
            }
        }catch (error) {
                return httpResponse(res, 400, error.message, ERROR);
        }
    },
    photo: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        try {
            const blog = await Blog.findOne({slug}).select('photo');
            if(blog){
                res.set('Content-Type', blog.photo.contentType);
                return res.status(200).send( blog.photo.data);
               // return httpResponse(res, 200, blog.photo.data);
            }else{
                return httpResponse(res, 404, "Blog not found", ERROR);
            }
        } catch (error) {
            return httpResponse(res, 500, error.message, ERROR);
        }
        
    },
    listRelated: async(req, res) => {
        let limit = req.body?.limit ? req.body?.limit : 3;
        try {
            const {_id, categories} = req.body;
            if(!Array.isArray(categories)){
                throw new Error("category is a non-array value")
            }
            const blogs = await Blog.find({_id: {$ne: _id}, categories: {$in: categories}})
                                .limit(3)
                                .populate('postedBy', '_id name profile')
                                .select('title slug excerpt postedBy createdAt updatedAt');
            
            if(!Array.isArray(blogs)){
                throw new Error('error in fetching related blogs');
            }
            return httpResponse(res, 200, blogs);
        } catch (error) {
            return httpResponse(res, 500, error.message, ERROR);
        }
    }
}