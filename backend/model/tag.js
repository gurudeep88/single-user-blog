const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 32
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }
}, { timestamps: true });

module.exports = model('Tag', tagSchema);