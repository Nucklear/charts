var mongoose = require('mongoose');

var Qrk = new mongoose.Schema({
  currency: String,
  time: Date,
  amount: Number,
  volume: Number,
  price: Number
});

module.exports =  mongoose.model('Qrks', Qrk);