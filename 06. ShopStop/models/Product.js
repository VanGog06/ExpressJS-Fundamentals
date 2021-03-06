const mongoose = require('mongoose');

let ObjectID = mongoose.Schema.ObjectId;

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: {
        type: Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: { type: String },
    category: { type: ObjectID, ref: 'Category' },
    isBought: { type: Boolean, default: false }
});

let Cat = mongoose.model('Product', productSchema);

module.exports = Cat;