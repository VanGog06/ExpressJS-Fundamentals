const encryption = require('../utilities/encryption');

const User = require('../model/User').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: (req, res) => {
        let reqUser = req.body;

        if (!reqUser.username) {
            res.locals.globalError = 'Username field cannot be empty';
            res.render('users/register');
            return;
        }

        if (!reqUser.password) {
            res.locals.globalError = 'Password field cannot be empty';
            res.render('users/register');
            return;
        }

        if (!reqUser.firstName) {
            res.locals.globalError = 'First name field cannot be empty';
            res.render('users/register');
            return;
        }

        if (!reqUser.lastName) {
            res.locals.globalError = 'Last name field cannot be empty';
            res.render('users/register');
            return;
        }

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password);

        User.create({
            username: reqUser.username,
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            salt: salt,
            hashedPassword: hashedPassword
        }).then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                    return;
                }

                res.redirect('/');
            })
        });
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: (req, res) => {
        let reqUser = req.body;
        User
            .findOne({ username: reqUser.username }).then(user => {
            if (!user) {
                res.locals.globalError = 'Invalid user data';
                res.render('users/login');
                return;
            }

            if (!user.authenticate(reqUser.password)) {
                res.locals.globalError = 'Invalid user data';
                res.render('users/login');
                return;
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/login');
                }

                res.redirect('/');
            })
        })
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};