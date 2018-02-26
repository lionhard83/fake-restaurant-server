var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var users = require('./routes/users');
var admin = require('./routes/admin');

app.use('/admin', admin);
app.use('/users', users);

app.listen(3001);
module.exports = app;
