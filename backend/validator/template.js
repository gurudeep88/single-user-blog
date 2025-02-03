const { check } = require("express-validator");

module.exports = {
    name:       check('name')
                .not()
                .isEmpty()
                .withMessage('Name is required!'),

    email:      check('email')
                .isEmail()
                .withMessage('Must be a valid email address'),

    password:   check('password')
                .isLength({min: 6})
                .withMessage('Password must be at least 6 characters long'),
}