const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: String,            
  type: String,           
  quantity: Number,
  price: Number
});

module.exports = TransactionSchema;
