const mongoose = require('mongoose');

let dbName = 'imagesAndTags';
let connectingString = `mongodb://localhost:27017/${dbName}`;

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connect(connectingString);

        let db = mongoose.connection;

        db.once('open', (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log('Connected to database!');
            resolve();
        });

        db.on('err', err => {
            console.log(err);
            reject();
        });
    });
};