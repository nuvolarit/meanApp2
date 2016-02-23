// Dependencies
var express = require('express');
var router = express.Router();
var articleService = require('../services/article');

// Models
var Article = require('../models/article');

// Routes
router.get('/articles', function (req, res) {

    articleService.find(
        req.query.q,
        req.query.select,
        req.query.sort,
        req.query.skip,
        req.query.limit,
        function (err, data) {
            res.send(data);
        });
});

router.get('/articles/:id', function (req, res) {

    articleService.getById(req.params.id, function (err, data) {
        res.send(data);
    });
});


// Return router
module.exports = router;
