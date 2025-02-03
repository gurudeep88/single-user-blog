const { check } = require("express-validator");
const template = require("./template");

const {name, email, password} = template;

module.exports = {
    register: [
        name,
        email,
        password
    ],
    login: [
        email,
        password
    ]
}