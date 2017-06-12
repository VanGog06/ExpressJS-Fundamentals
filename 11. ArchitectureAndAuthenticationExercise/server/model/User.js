const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required!';

let userSchema = new mongoose.Schema({
    username: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true },
    firstName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    lastName: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    salt: String,
    hashedPassword: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        return (encryption.generateHashedPassword(this.salt, password) === this.hashedPassword);
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
    User.find().then(user => {
        if (user.length > 0) return;

        let salt = encryption.generateSalt();
        let hashedPassword = encryption.generateHashedPassword(salt, 'admin');

        User.create({
            username: 'admin',
            firstName: 'admin',
            lastName: 'admin',
            salt: salt,
            hashedPassword: hashedPassword,
            roles: ['Admin']
        });
    });
};