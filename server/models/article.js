// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtitle: String,
  author: String,
  pubDate: Date
});

// Return model
module.exports = restful.model('Articles', articleSchema);
