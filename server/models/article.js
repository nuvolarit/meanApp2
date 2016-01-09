// Dependencies
var mongoose = require('mongoose');

// Schema
var articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  subtitle: String,
  author: String,
  pub_date: Date
});

// Return model
module.exports = mongoose.model('Articles', articleSchema);
