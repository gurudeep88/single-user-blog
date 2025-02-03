const { expressjwt } = require("express-jwt");
const { User } = require("../model");
const { ROLE, ERROR } = require("../constant");
const { JWT_SECRET } = require("../config");
const { httpResponse } = require("../utils");

module.exports = {
    requiresLogin: expressjwt({
        secret: JWT_SECRET,
        algorithms: ["HS256"]
    }),
    user: async(req, res, next) => {
        const userId = req.auth?._id;
        try {
            const user = await User.findById({_id: userId}).select('-hashedPassword');
            if(user){
                req.profile = user;
            }
            next();
        } catch (error) {
            return res.status(400).json({error: "User not found"})
        }   
    },
    admin: async(req, res, next) => {
        const adminId = req.auth?._id;
        try {
            const admin = await User.findById({_id: adminId}).select('-hashedPassword');
            if(!admin){
                return httpResponse(res, 404, "Admin not found, id doesn't exist", ERROR);
            }
            if(admin.role !== ROLE.admin){
                return httpResponse(res, 403, "Admin resource, access denied!", ERROR);
            }
            req.profile = admin;
            next();
        } catch (error) {
            return httpResponse(res, 500, "Error in validating admin: " + error.message, ERROR);
        }
        
    }
}