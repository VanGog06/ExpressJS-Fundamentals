const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.ObjectId;

let tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creationData: { type: Date, default: Date.now() },
    images: [{ type: ObjectId, ref: 'Image' }]
});

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;