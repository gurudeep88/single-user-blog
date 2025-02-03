const shortId = require("shortid");
const { User } = require("../model");
const { CLIENT_URL, JWT_SECRET, JWT_TOKEN_EXPIRES_IN } = require("../config");
const jwt = require('jsonwebtoken');

module.exports = {
    register: async(req, res) => {
        const { email, name, password } = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({
                error: 'Email already exists'
            })
        }
        try {
            let username = shortId.generate();
            let profile = `${CLIENT_URL}/profile/${username}`;
            await new User({name, email, password, profile, username}).save();
            return res.status(201).json({message: "Signup successful! Please login."});
        } catch (error) {
            return res.status(500).json({error});
        }
    },
    login: async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                error: 'email does not exist'
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'email & password do not match'
            })
        }
        try {
            const token = await jwt.sign({_id: user._id}, JWT_SECRET, {expiresIn: JWT_TOKEN_EXPIRES_IN});
            res.cookie('x_access_token', token, {expiresIn: JWT_TOKEN_EXPIRES_IN});
            const {_id, name, username, email, role} = user;
            return res.status(200).json({
                token, 
                user: {_id, name, username, email, role}
            });
        } catch (error) {
            return res.status(500).json({error});
        }
    },
    logOut: async(req, res) => {
        res.clearCookie('x_access_token');
        res.status(200).json({
            message: "Signed out successfully"
        })
    }
}