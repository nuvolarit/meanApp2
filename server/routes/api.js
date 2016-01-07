// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Article = require('../models/article');

// Routes
Article.methods(['get', 'put', 'post', 'delete']);
Article.register(router, '/articles');

// Return router
module.exports = router;
