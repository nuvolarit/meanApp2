/// <reference path="../typings/tsd.d.ts" />
import {Mongoose, Schema, Model, Document} from 'mongoose';

export interface IArticle extends Document {
    title: string
}

var mongoose: Mongoose = new Mongoose();
var articleSchema: Schema = new Schema({
    title: String
});

export var article = mongoose.model<IArticle>('Article', articleSchema);


