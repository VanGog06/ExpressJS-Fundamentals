const mongoose = require('mongoose');

const ERRPR_MESSAGE = '{PATH} is requried!';

let carSchema = new mongoose.Schema({
    make: { type: String, required: ERRPR_MESSAGE },
    model: { type: String, require: ERRPR_MESSAGE },
    year: { type: Number, required: ERRPR_MESSAGE },
    pricePerDay: { type: Number, required: ERRPR_MESSAGE, min: 0.01 },
    power: { type: Number },
    createdOn: { type: Date, default: Date.now() },
    image: { type: String, required: ERRPR_MESSAGE },
    isRented: { type: Boolean, default: false }
});

let Car = mongoose.model('Car', carSchema);

module.expors = Car;

