var article = require('../models/article');
var assert = require('assert');
//var article = {};

module.exports.getArticle = function (page, callback) {

    var pageSize = 10;
    var skip = 10 * (isNaN(page) ? 0 : (parseInt(page) - 1));
    var count = 0;

    function find() {
        article.find()
            .skip(skip)
            .limit(pageSize)
            .exec(function (err, data) {
                callback(err, {
                    page: page,
                    count: count,
                    data: data
                });
            });
    }
    
    if (page == 1) {
        article.find()
            .count()
            .exec(function (err, data) {
                count = data;
                console.log(data);
                find();
            });
    } else {
        find();
    }
}

//module.exports = article;
 