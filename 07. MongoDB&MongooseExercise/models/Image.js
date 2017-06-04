const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.ObjectId;

let imageSchema = new mongoose.Schema({
    url: { type: String, require: true },
    creationDate: { type: Date, default: Date.now() },
    description: { type: String },
    tags: [{ type: ObjectId, ref: 'Tag' }]
});

let Image = mongoose.model('Image', imageSchema);

module.exports = Image;