var mongoose = require('mongoose');

/**
 * Define MongoDB Schema/Models
 */
var userSchema = mongoose.Schema({
  username:   String,
  first_name: String,
  last_name:  String
});
var User = mongoose.model('User', userSchema);

var models = {
  User: User
};

module.exports = models;
