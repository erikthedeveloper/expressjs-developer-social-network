var express = require('express');
var router = express.Router();

var users = {
  '1': {
    id: 1,
    name: 'Joseph Myers'
  },
  '2': {
    id: 2,
    name: 'Sally Smith'
  },
  '3': {
    id: 3,
    name: 'John Doe'
  }
};

/**
 * Capture and Set Up :person_id from route parameters
 */
router.param('person_id', function(req, res, next, person_id) {
    req.user = users[person_id] || "No User Found!";
    next();
});

/* users.index */
router.get('/', function(req, res) {
  res.render('users/index', {users: users});
});

/* users.new */
router.get('/new', function(req, res) {
  res.render('users/new', {user: req.user});
});

/* users.create */
router.post('/', function(req, res) {
  var response_data = {
    name: req.param('name')
  };
  res.send(response_data);
});

/* users.show */
router.get('/:person_id', function(req, res) {
  res.render('users/show', {user: req.user});
});

/* users.edit */
router.get('/:person_id/edit', function(req, res) {
  res.render('users/edit', {user: req.user});
});

/* users.update */
router.put('/:person_id', function(req, res) {
    res.send("Updating user! (" + req.user.name + ")");
});

/* users.destroy */
router.delete('/:person_id', function(req, res) {
    res.send("Destroy! (" + req.user.name + ")");
});

module.exports = router;
