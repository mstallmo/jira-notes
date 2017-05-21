/**
 * Created by Mason on 4/5/2017.
 */
module.exports = function(app, passport) {
    const mainController = require('./controller/main.controller')(app, passport);
    const ticketController = require('./controller/ticket.controller');

    app.get('/', (req, res) => {
        mainController.showIndex(req, res);
    });

    app.get('/login', (req, res) => {
        mainController.showLogin(req, res);
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/tickets',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/signup', (req, res) => {
        mainController.showSignup(req, res);
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/tickets',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get("/home", isLoggedIn, (req, res) => {
        mainController.showHome(req, res);
    });

    app.get("/tickets", isLoggedIn, (req, res) => {
        ticketController.showTickets(req, res);
    });

    app.get('/tickets/seed', (req, res) => {
        ticketController.seedTickets(req, res);
    });

    app.get("/tickets/:slug", isLoggedIn, (req, res) => {
        ticketController.showSingle(req, res);
    });

    app.get("/tickets/edit/:slug", isLoggedIn, (req, res) => {
        ticketController.editTickets(req, res);
    });

    app.get("/tickets/delete/:slug", isLoggedIn, (req, res) => {
        ticketController.removeTicket(req, res);
    });

    app.post("/add", isLoggedIn, (req, res) => {
        ticketController.addTicket(req, res);
    });

    app.post("/edit", isLoggedIn, (req, res) => {
        ticketController.updateTicket(req, res);
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated())
        return next();

    res.redirect('/');
}