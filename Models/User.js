const mongoose = require('mongoose');
const Holding = require("./holding")
const HoldingSchema = require('./holding');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  email: { type: String, required: true, unique: true },
  password: String,
  holdings: [HoldingSchema]
});

module.exports = mongoose.model('User', userSchema);