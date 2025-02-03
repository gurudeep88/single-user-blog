const { validationResult } = require("express-validator");
const auth = require("./auth");
const tag = require("./tag");
const category = require("./category");
const { httpResponse } = require("../utils");

module.exports = {
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return httpResponse(res, 422, errors.array()[0].msg);
        }
        next();
    },
    auth,
    category,
    tag
}