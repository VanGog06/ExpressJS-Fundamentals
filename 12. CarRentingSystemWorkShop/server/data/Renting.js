const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

let rentingSchema = new mongoose.Schema({
  user: { type: ObjectID, ref: 'User', required: true },
  car: { type: ObjectID, ref: 'Car', required: true },
  rentedOn: { type: Date, default: Date.now() },
  days: {type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

let Renting = mongoose.model('Renting', rentingSchema);

module.exports = Renting;