const mongoose = require('mongoose');

const User = require('../model/User').model('User');

mongoose.Promise = global.Promise;

module.exports = settings => {
    mongoose.connect(settings.db);

    let db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            throw err;
            return;
        }

        console.log('MongoDB is Ready!');

        User.seedAdminUser();
    });

    db.on('error', err => {
        console.log('Database error: ' + err);
    });
};