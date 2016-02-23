var article = require('../models/article');
var assert = require('assert');

function getById(id, callback) {

    article.findById(id).exec(function (err, data) {
        callback(err, {
            data: data
        });
    });
}

function find(q, select, sort, skip, limit, callback) {

    skip = isNaN(skip) ? 0 : parseInt(skip);
    limit = isNaN(limit) ? 10 : parseInt(limit);
    if (!sort) { sort = '-pub_date' }
    if (!select) { select = 'title author pub_date' }
    select = select.replace(',', ' ')
    
    article.find({ title: { $regex: `\\b${q}`, $options: 'i' } })
        .skip(skip)
        .limit(limit)
        .select(select)
        .sort(sort)
        .exec(function (err, data) {
            callback(err, {
                q: q,
                select: select,
                sort: sort,
                skip: skip,
                limit: limit,
                data: data
            });
        });
}

function getPage(page, callback) {

    var limit = 10;
    var skip = limit * (isNaN(page) ? 0 : (parseInt(page) - 1));
    var count = 0;

    if (page == 1) {
        article.find()
            .count()
            .exec(function (err, data) {
                count = data;
                find(skip, limit, callback);
            });
    } else {
        find(skip, limit, callback);
    }
}

module.exports = {
    getById: getById,
    find: find,
    getPage: getPage
};
 