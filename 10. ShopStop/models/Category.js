const mongoose = require('mongoose');

let ObjectID = mongoose.Schema.ObjectId;

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    creator: { type: ObjectID, ref: 'User', required: true },
    products: [{ type: ObjectID, ref: 'Product' }]
});

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;