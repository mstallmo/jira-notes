/**
 * Created by Mason on 4/5/2017.
 */
module.exports = function (app, passport) {
    var module = {};

    module.showIndex = (req, res) => {
        res.render('pages/index');
    };

    module.showHome = (req, res) => {
        res.render('pages/home', {user: req.user});
    };

    module.showLogin = (req, res) => {
        res.render('pages/login', {message: req.flash('loginMessage') });
    };

    module.showSignup =(req, res) => {
        res.render('pages/signup', {message: req.flash('signupMessage') });
    };

    return module;
};