var express = require('express');
var router = express.Router();

/**
 * Capture and Set Up :person_id from route parameters
 */
router.param('person_id', function(req, res, next, person_id) {
    var people = {
        '1': {name: 'Joseph Myers'},
        '2': {name: 'Sally Smith'},
        '3': {name: 'John Doe'}
    };
    req.person = people[person_id] || "No User Found!";
    next();
});

/* users.index */
router.get('/', function(req, res) {
  res.render('index', {title: 'Users Index'});
});

/* users.new */
router.get('/new', function(req, res) {
  res.render('index', {title: 'Users New'});
});

/* users.create */
router.post('/', function(req, res) {
  res.render('index', {title: 'Users Create'});
});

/* users.show */
router.get('/:person_id', function(req, res) {
  res.render('index', {title: 'Users Show: ' + req.person.name});
});

/* users.edit */
router.get('/:person_id/edit', function(req, res) {
  res.render('index', {title: 'Users Edit: ' + req.person.name});
});

/* users.update */
router.put('/:person_id', function(req, res) {
  res.render('index', {title: 'Users Update: ' + req.person.name});
});

/* users.destroy */
router.delete('/:person_id', function(req, res) {
  res.render('index', {title: 'Users Destroy: ' + req.person.name});
});

module.exports = router;
