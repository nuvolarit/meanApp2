// Dependencies
var express = require('express');
var router = express.Router();
var articleService = require('../services/article');

// Models
var Article = require('../models/article');

// Routes
router.get('/articles/:page', function (req, res) {

    articleService.getArticle(req.params.page, function (err, data) {
        res.send(data);
    });
});

// Return router
module.exports = router;
