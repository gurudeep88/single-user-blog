

//port 
const {PORT, NODE_ENV, CLIENT_URL, DB_HOST, DB_PORT, DB_NAME, JWT_SECRET, APP_NAME} = process.env;

const { generateDBURL } = require("../utils");

module.exports = {
    PORT: PORT || 8000,
    NODE_ENV,
    CLIENT_URL,
    DB_URL: generateDBURL(DB_HOST, DB_PORT, DB_NAME),
    JWT_SECRET,
    JWT_TOKEN_EXPIRES_IN: '1d',
    APP_NAME
};