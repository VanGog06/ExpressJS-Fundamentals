const mongoose = require('mongoose');

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required.';

let ObjectId = mongoose.Schema.ObjectId;

let articleSchema = new mongoose.Schema({
    title: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
    description: { type: String, required: REQUIRED_VALIDATION_MESSAGE},
    creationDate: { type: Date, default: Date.now() },
    creator: { type: ObjectId, ref: 'User' }
});

let Article = mongoose.model('Article', articleSchema);

module.exports = Article;