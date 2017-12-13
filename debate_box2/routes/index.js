var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("/ Route");
    //    console.log(req);
    console.log(req.session);
    if (req.session.user) {
        console.log("/ Route if user");
        console.log(req.session.username)
        res.render('index', {
            username: req.session.username
        });
    } else {
        console.log("/ Route else user");
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});

router.get('/login', function(req, res) {
    console.log("/login Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('login', { msg: req.session.msg });
});

router.get('/logout', function(req, res) {
    console.log("/logout Route");
    req.session.destroy(function() {
        res.redirect('/login');
    });
});

router.get('/signup', function(req, res) {
    console.log("/signup Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('signup', { msg: req.session.msg });
});

router.post('/signup', users.signup);
router.post('/login', users.login);

module.exports = router;