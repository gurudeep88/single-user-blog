const { default: slugify } = require("slugify");
const { Tag } = require("../model");
const { httpResponse } = require("../utils");
const { ERROR, MESSAGE } = require("../constant");

module.exports = {
    create: async(req, res) => {
        const { name } = req.body;
        if(!name){
            return httpResponse(res, 400, "Tag name is missing", ERROR);
        }
        const slug = slugify(name);
        const existingTag = await Tag.findOne({slug});
        if(existingTag){
            return httpResponse(res, 490, "Tag with the slug already exists", ERROR);
        }
        try {
            const tag = await Tag.create({name, slug});
            return httpResponse(res, 200, tag);
        } catch (error) {
            return httpResponse(res, 500, "Error in tag creation: " + error.message, ERROR);
        }
    }, 
    list: async(req, res) => {
        try {
            const tags = await Tag.find();
            return httpResponse(res, 200, tags);
        } catch (error) {
            return httpResponse(res, 500, "Error in fetching tags: " + error.message, ERROR);
        }
    },
    read: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        if(!slug){
            return httpResponse(res, 400, "Slug is missing", ERROR);
        }
        try {
            const tag = await Tag.findOne({slug});
            if(!tag){
                return httpResponse(res, 404, "Tag does not exist", ERROR);
            }
            return httpResponse(res, 200, tag);
        } catch (error) {
            return httpResponse(res, 500, "Error in fetching tag: " + error.message, ERROR);
        }
    },
    delete: async(req, res) => {
        const slug = req.params?.slug?.toLowerCase();
        if(!slug){
            return httpResponse(res, 400, "Missing slug", ERROR);
        }
        try {
            const deletedTag = await Tag.findOneAndDelete({slug});
            if(!deletedTag){
                return httpResponse(res, 404, "Invalid slug", ERROR);
            }
            return httpResponse(res, 200, "Successfully deleted the Tag", MESSAGE);
        } catch (error) {
            return httpResponse(res, 500, "Error in deleting tag: " + error.message, ERROR);
        }
    }
}