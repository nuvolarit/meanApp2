/// <reference path="../typings/tsd.d.ts" />
import {article, IArticle} from '../models/article';

export function getById(id: string): Promise<IArticle> {

    return new Promise<IArticle>((resolve, reject) => {
        article.findById(id)
            .exec().onResolve((err, result) => {
                err ? reject(err) : resolve(result)
            });
    });
}

export function find(q: string, select: string, sort: string, skip: number, limit: number) {

    if (limit === 0) { limit = 10; }
    if (!sort) { sort = '-pub_date' }
    if (!select) { select = 'title author pub_date' }
    select = select.replace(',', ' ')

    article.count({}, (err, count) => {
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

 