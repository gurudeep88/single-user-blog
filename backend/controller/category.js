const slugify = require('slugify');
const { Category } = require('../model');
const { ERROR, MESSAGE } = require('../constant');
const { httpResponse } = require('../utils');

module.exports = {
    create: async(req, res) => {
        try{
            const { name } = req.body;
            if(!name){
                return httpResponse(res, 400, "Category name is missing", ERROR);
            }
            let slug  = slugify(name).toLowerCase();
            const isCategoryAvailable = await Category.findOne({slug});
            if(isCategoryAvailable){
                return httpResponse(res, 409, "category already exists!", ERROR);
            }else{
                const category = await new Category({name, slug}).save();
                return httpResponse(res, 201, category);
            }
        }catch(error){
            return httpResponse(res, 500, "Errors in creating category: " + error.message, ERROR)
        }
    },
    list: async(req, res) => {
        try {
            const categories = await Category.find();
            return httpResponse(res, 200, categories);
        } catch (error) {
            return httpResponse(res, 500, "Error in fetching categories: " + error.message, ERROR)
        }
    },
    read: async(req, res) => {
        try {
            const slug = req.params.slug?.toLowerCase();
            const category = await Category.findOne({slug});
            if(!category){
                return httpResponse(res, 404, "Invalid slug", ERROR);
            }
            return httpResponse(res, 200, category);
        } catch (error) {
            return httpResponse(res, 500, "Error in fetching category: " + error.message, ERROR)
        }
    },
    delete: async(req, res) => {
        try {
            const slug = req.params.slug?.toLowerCase();
            if(!slug){
                return httpResponse(res, 400, "Missing slug", ERROR);
            }
            const deletedCategory = await Category.findOneAndDelete({slug});
            if(!deletedCategory){
                return httpResponse(res, 404, "Invalid slug", ERROR);
            }
            return httpResponse(res, 200, "Category successfully deleted", MESSAGE);
        } catch (error) {
            return httpResponse(res, 500, "Error in deleting category: " + error.message, ERROR)
        }
    }
}