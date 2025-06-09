// models/Holding.js
const mongoose = require('mongoose');
const TransactionSchema = require('./transaction');

const HoldingSchema = new mongoose.Schema({
  symbol: String,           
  name: String,           
  currentPrice: Number,    
  transactions: [TransactionSchema] 
});

module.exports = HoldingSchema;
