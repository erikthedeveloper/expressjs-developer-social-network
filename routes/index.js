var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // res.render('index'); // TODO: Needs a decent looking homepage!
  res.redirect('/users');
});

module.exports = router;
