// Dependencies
var mongoose = require('mongoose');

// Schema
var articleSchema = new mongoose.Schema();

// Return model
module.exports = mongoose.model('Article', articleSchema);

