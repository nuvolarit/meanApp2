var articleService = require('../services/article');
function list(req, res) {
    articleService.find(req.params.q, req.params.select, req.params.sort, parseInt(req.params.skip), parseInt(req.params.limit));
}
exports.list = list;
function getById(req, res) {
    articleService.getById(req.params.id)
        .then(function (data) {
        res.send(data);
    });
}
exports.getById = getById;
