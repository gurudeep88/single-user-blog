const { check } = require("express-validator");
const { name } = require("./template");

module.exports = {
    create: [
        name
    ]
}