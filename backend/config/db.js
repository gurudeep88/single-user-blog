const { default: mongoose } = require("mongoose")
const { DB_URL } = require(".")

module.exports = {
    connectDB: () => {
        mongoose.connect(DB_URL, {})
        .then(() => {
            console.log('DB connected successfully')
        })
        .catch(error => console.log('Error in DB connection: ', error));
    }
}