const { Schema, model } = require("mongoose");
const { CHARACTER_LENGTH } = require("../constant");
const {ObjectId} = Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        min: CHARACTER_LENGTH.title.min,
        max: CHARACTER_LENGTH.title.max,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    body: {
        type: {},
        required: true,
        min: CHARACTER_LENGTH.body.min,
        max: CHARACTER_LENGTH.body.max
    },
    excerpt: {
        type: String,
        max: CHARACTER_LENGTH.excerpt.max
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    categories: [
        { 
            type: ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    tags: [
        {
            type: ObjectId,
            ref: 'Tag',
            required: true
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = model('Blog', blogSchema);