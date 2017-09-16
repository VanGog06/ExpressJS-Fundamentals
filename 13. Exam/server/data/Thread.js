const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const VALIDATION_MESSAGE = '{PATH} is required';

let threadSchema = new mongoose.Schema({
  startedBy: { type: String, required: VALIDATION_MESSAGE },
  with: { type: String, required: VALIDATION_MESSAGE },
  createdOn: { type: Date, required: VALIDATION_MESSAGE },
  messages: [{ type: ObjectId, ref: 'Message' }]
});

let Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;