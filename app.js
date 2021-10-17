const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const checkToken = require('./middlewares/checkToken.js');

const signUp = require('./controllers/signup.js');
const login = require('./controllers/login.js');
const myProfile = require('./controllers/myProfile.js');
const logout = require('./controllers/logout.js');
const code = require('./controllers/code.js');

const app = express();

app.use((express.urlencoded({ extended: true })),
    (express.json({ extended: true })),
    (logger('dev')));
app.use(cors());

app.post('/signup', signUp);
app.post('/login', login)

app.all('*', checkToken);
app.get('/my-profile', myProfile);
app.get('/logout', logout);
app.get('/code', code);


module.exports = app;
