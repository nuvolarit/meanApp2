/// <reference path="../typings/tsd.d.ts" />
var mongoose_1 = require('mongoose');
var mongoose = new mongoose_1.Mongoose();
var articleSchema = new mongoose_1.Schema({
    title: String
});
exports.article = mongoose.model('Article', articleSchema);
