/**
 * Created by Mason on 4/5/2017.
 */
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.DB_URI);

require('./app/config/passport')(passport);

require('./app/routes')(app, passport);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

module.exports = app;