const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const { PORT, NODE_ENV, CLIENT_URL } = require('./config');
const { DEVELOPMENT } = require('./constant');
const { connectDB } = require('./config/db');

//importing routes
const { user, auth , category, tag, blog } = require('./route');

//app
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//cors
let corsConfig;
if(NODE_ENV === DEVELOPMENT){
    corsConfig = {
        origin: CLIENT_URL
    }
}
console.log('NODE_ENV', NODE_ENV, CLIENT_URL)
app.use(cors(corsConfig));

//db
connectDB();

//routes
app.use('/api', user);
app.use('/api', auth);
app.use('/api', category);
app.use('/api', tag);
app.use('/api', blog);

app.listen(`${PORT}`, () => {
    console.log('Server is running on Port: '+ PORT)
})
