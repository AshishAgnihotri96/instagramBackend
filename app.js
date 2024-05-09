const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const path = require('path');
const cors = require('cors');
const app = express()
//using cors

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));

if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: 'config/config.env' });
}

// import routes
const post = require('./routes/postRoute');
const user = require('./routes/userRoute');
const chat = require('./routes/chatRoute');
const message = require('./routes/messageRoute');

app.use('/api/v1', post);
app.use('/api/v1', user);
app.use('/api/v1', chat);
app.use('/api/v1', message);

app.use(express.static(path.join(__dirname, 'build')));

// Handle React Router routes by serving index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// error middleware
app.use(errorMiddleware);


module.exports = app;