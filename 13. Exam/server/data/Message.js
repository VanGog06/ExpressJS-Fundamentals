const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const VALIDATION_MESSAGE = '{PATH} is required';

let messageSchema = new mongoose.Schema({
  sendBy: { type: String, required: VALIDATION_MESSAGE },
  sendTo: { type: String, required: VALIDATION_MESSAGE },
  message: { type: String, required: VALIDATION_MESSAGE },
  sendOn: { type: Date, default: Date.now() },
  isImage: { type: Boolean },
  isLink: { type: Boolean },
  likedBy: [{ type: String}]
});

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;