/// <reference path="../typings/tsd.d.ts" />
import * as Express from 'express';
import * as articleService from '../services/article';
import {IArticle} from '../models/article';

export function list(req: Express.Request, res: Express.Response) {

    articleService.find(
        req.params.q,
        req.params.select,
        req.params.sort,
        parseInt(req.params.skip),
        parseInt(req.params.limit));

}

export function getById(req: Express.Request, res: Express.Response) {

    articleService.getById(req.params.id)
        .then((data: IArticle) => {
            res.send(data);
        });
}
