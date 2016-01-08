var article = require('../models/article');

//var article = {};

exports.getArticle = function(page, callback) {
    
    var pageSize = 10;
    var skip = 10 * (isNaN(page) ? 
        0 : (parseInt(page) - 1));
    
    console.log(skip);
    
    article.find()
        .skip(skip)
        .limit(pageSize)
        .exec(callback);
}

//module.exports = article;
 