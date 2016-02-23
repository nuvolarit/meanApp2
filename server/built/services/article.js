/// <reference path="../typings/tsd.d.ts" />
var article_1 = require('../models/article');
function getById(id) {
    return new Promise(function (resolve, reject) {
        article_1.article.findById(id)
            .exec().onResolve(function (err, result) {
            err ? reject(err) : resolve(result);
        });
    });
}
exports.getById = getById;
function find(q, select, sort, skip, limit) {
    if (limit === 0) {
        limit = 10;
    }
    if (!sort) {
        sort = '-pub_date';
    }
    if (!select) {
        select = 'title author pub_date';
    }
    select = select.replace(',', ' ');
    article_1.article.count({}, function (err, count) {
        console.log(err);
        console.log(count);
    });
    /*
    article.find({ title: { $regex: `\\b${q}`, $options: 'i' } })
        .skip(skip)
        .limit(limit)
        .select(select)
        .sort(sort)
        .exec((err, data) => {
            console.log(data);
        });
        */
}
exports.find = find;
