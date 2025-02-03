const { Schema, model } = require("mongoose");
const crypto = require('crypto');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,                     //to make it indexable for handling more db queries
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true
    },
    profile: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: String,
    about: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    photo: {
        type: Buffer,
        contentType: String
    },
    resetPasswordLink: {
        type: String,
        default: ''
    }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods  = {
    authenticate: function(password){
        return this.encryptPassword(password) === this.hashedPassword;
    },
    encryptPassword: function(password){
        if(!password) return '';
        try {
            return crypto
                    .createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex');
        } catch (error) {
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = model('User', userSchema);