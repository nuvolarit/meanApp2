// Dependencies
var express = require('express');
var router = express.Router();
var articleService = require('../services/article');

// Models
var Article = require('../models/article');

// Routes
/*
Article.methods(['get', 'put', 'post', 'delete']);
Article.register(router, '/articles');
*/

router.get('/articles/:page', function (req, res) {
    console.log(req.params);
    articleService.getArticle(req.params.page, function (err, data) {
        res.send(data);
    });
});

// Return router
module.exports = router;
