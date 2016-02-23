var routes = require('./routes/api');
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// MongoDB
mongoose.connect('mongodb://localhost/dea');
//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
// CORS Support
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Content-Type', '*');
    next();
});
app.use(function (req, res, next) {
    console.log("originalUrl: \"" + req.originalUrl + "\"");
    console.log("query: " + JSON.stringify(req.query));
    next();
});
//Routes
app.use('/api/articles', routes.list);
app.use('/api/articles/:id', routes.getById);
//Start server
app.listen(3000);
console.log('API is running on port 3000');
