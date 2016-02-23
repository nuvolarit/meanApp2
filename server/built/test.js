/// <reference path="typings/tsd.d.ts" />
var mongoose = require('mongoose');
var express = require('express');
var Rx = require('rx');
var articleSchema = new mongoose.Schema();
var articles = mongoose.model('Article', articleSchema);
function _find(q, limit, select, sort) {
    return articles
        .find({ title: { $regex: "\\b" + q, $options: 'i' } })
        .limit(limit)
        .select(select)
        .sort(sort);
}
function findCallback(q, callback) {
    _find(q)
        .exec(function (err, res) {
        if (err) {
            throw err;
        }
        callback(res);
    });
}
function findPromise(q, limit, select, sort) {
    var p = new Promise(function (resolve, reject) {
        _find(q, limit, select, sort)
            .exec()
            .onResolve(function (err, result) {
            resolve(result);
        })
            .onReject(function (err) {
            reject(err);
        });
    });
    return p;
}
function findObservable(queries) {
    var requestStream = Rx.Observable.fromArray(queries);
    var responseStream = requestStream
        .flatMap(function (q) {
        var limit = 1;
        return Rx.Observable.fromPromise(findPromise(q, limit, 'title'));
    });
    return responseStream;
}
mongoose.connect("mongodb://localhost/dea", function (err) {
    if (err) {
        throw err;
    }
    var app = express();
    app.use('/api/articles', function (req, res) {
        findObservable(['borsa', 'milano'])
            .subscribe(function (value) {
            console.log(value);
        }, function (err) {
            throw err;
        }, function () {
            res.sendStatus(200);
        });
    });
    /*
    app.use('/api/articles', (req, res) => {
        findObservable(req.query.q)
            .subscribe((value: IArticle[]) => {
                res.send(value);
            }, (err) => {
                throw err;
            });
      */
    /*
    findPromise(
        req.query.q,
        req.query.limit,
        req.query.select,
        req.query.sort)
        .then((value: IArticle[]) => {
            res.send(value);
        })
        .catch((err) => {
            throw err;
        });
        */
    //});
    app.listen(3000);
    console.log('API is running on port 3000');
});
