var mongoose = require('mongoose');

var Btc = new mongoose.Schema({
  currency: String,
  time: Date,
  amount: Number,
  price: Number
});

module.exports =  mongoose.model('Btcs', Btc);