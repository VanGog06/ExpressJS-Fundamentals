const mongoose = require('mongoose');

const encryption = require('../utilities/encryption');
const propertyIsRequired = `{PATH} is required.`;

let ObjectId = mongoose.Schema.ObjectId;

let userSchema = mongoose.Schema({
    username: { type: String, required: propertyIsRequired, unique: true },
    password: { type: String, required: propertyIsRequired },
    salt: { type: String, required: true },
    firstName: { type: String, required: propertyIsRequired },
    lastName: { type: String, required: propertyIsRequired },
    age: { type: Number, min: [0, 'Age must be between 0 and 120.'], max: [120, 'Age must be between 0 and 120.'] },
    gender: { type: String, enum: { values: ['Male', 'Female'], message: 'Gender must be either "Male" or "Female".' } },
    roles: [{ type: String }],
    boughtProducts: [{ type: ObjectId, ref: 'Product' }],
    createdProducts: [{ type: ObjectId, ref: 'Product' }],
    createdCategories: [{ type: ObjectId, ref: 'Category' }]
});

userSchema.method({
    authenticate: function(password) {
        let hashedPassword = encryption.generateHashedPassword(this.salt, password);

        return hashedPassword === this.password;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
        User.find({username: 'Admin'}).then(user => {
            if (user.length === 0) {
                let salt = encryption.generateSalt();
                let hashedPassword = encryption.generateHashedPassword(salt, 'Admin12');

                User.create({
                    username: 'Admin',
                    firstName: 'Chuck',
                    lastName: 'Test',
                    salt: salt,
                    password: hashedPassword,
                    age: 33,
                    gender: 'Male',
                    roles: ['Admin']
                });
            }
        });
};