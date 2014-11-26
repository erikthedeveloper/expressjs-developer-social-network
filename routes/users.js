var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;


/**
 * Capture and Set Up @:username from route parameters
 */
router.param('username', function(req, res, next, username) {
  var user = User.findOne({
    "username": username
  }).exec(function(err, user) {
    // if (err) return res.redirect('users');
    req.user = user;
    next();
  });
});

/* users.index */
router.get('/', function(req, res) {
  var users = User.find().exec(function(err, users) {
    res.render('users/index', {users: users});
  });
});

/* users.new */
router.get('/new', function(req, res) {
  res.render('users/new', {user: req.user});
});

/* users.create */
router.post('/', function(req, res) {
  var user_data = {
    username:   req.param('username'),
    first_name: req.param('first_name'),
    last_name:  req.param('last_name')
  };

  var new_user = User(user_data);

  new_user.save(function(err, created_user) {
    res.redirect("/users/@" + new_user.username);
  });
});

/* users.show */
router.get('/@:username', function(req, res) {
  res.render('users/show', {user: req.user});
});

/* users.edit */
router.get('/@:username/edit', function(req, res) {
  res.render('users/edit', {user: req.user});
});

/* users.update */
router.post('/@:username', function(req, res) {
  var user = req.user;
  user.first_name = req.param('first_name');
  user.last_name = req.param('last_name');
  user.save(function(err) {
    res.redirect("/users/@" + user.username);
  });
});

/* users.destroy */
router.delete('/@:username', function(req, res) {
  var user = req.user;
  user.remove(function(err) {
    if (err)
      return res.send("Error destroying: " + req.user.username);
    res.send("Destroyed! (" + req.user.username + ")");
  });
});

module.exports = router;
