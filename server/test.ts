/// <reference path="typings/tsd.d.ts" />

import * as mongoose from 'mongoose';
import * as express from 'express';
import * as Rx from 'rx';

export interface IArticle extends mongoose.Document { }
var articleSchema = new mongoose.Schema();
var articles = mongoose.model<IArticle>('Article', articleSchema);

function _find(q: string, limit?: number, select?: string, sort?: string): mongoose.Query<IArticle[]> {

    return articles
        .find({ title: { $regex: `\\b${q}`, $options: 'i' } })
        .limit(limit)
        .select(select)
        .sort(sort);
}

function findCallback(q: string, callback: (res: IArticle[]) => void) {

    _find(q)
        .exec((err, res: IArticle[]) => {
            if (err) { throw err; }
            callback(res)
        });
}

function findPromise(q: string, limit?: number, select?: string, sort?: string): Promise<IArticle[]> {

    var p: Promise<IArticle[]> = new Promise((resolve, reject) => {
        _find(q, limit, select, sort)
            .exec()
            .onResolve((err, result: IArticle[]) => {
                resolve(result);
            })
            .onReject((err) => {
                reject(err);
            })
    });

    return p;
}

function findObservable(queries: string[]): Rx.Observable<IArticle[]> {

    var requestStream = Rx.Observable.fromArray<string>(queries);

    var responseStream = requestStream
        .flatMap((q) => {
            let limit:number = 1;
            return Rx.Observable.fromPromise<IArticle[]>(findPromise(q, limit, 'title'));
        });

    return responseStream;
}

mongoose.connect("mongodb://localhost/dea", (err) => {

    if (err) { throw err; }

    var app: express.Express = express();

    app.use('/api/articles', (req, res) => {
        findObservable(['borsa', 'milano'])
            .subscribe((value: IArticle[]) => {
                console.log(value);
            }, (err) => {
                throw err;
            }, () => {
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
