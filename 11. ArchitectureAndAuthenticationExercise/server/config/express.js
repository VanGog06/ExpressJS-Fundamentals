const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const favicon = require('serve-favicon');

module.exports = (app) => {
    app.engine('handlebars', handlebars({
        defaultLayout: 'main'
    }));
    app.set('view engine', 'handlebars');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
            secret: 'neshto-taino!@#$%',
            resave: false, saveUninitialized: false
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(favicon(__dirname + '/../../public/images/favicon.ico'));

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });

    app.use(express.static('public'));

    console.log('Express Ready!');
};