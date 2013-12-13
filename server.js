var express = require('express');
var app = express();
var request = require('request');
var config = require('./config');
var parser = require('./parser');

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

var vals = [];

setInterval(function(){
  parser.getQrkValue(function(price, time){
    console.log(time,price);
    vals.push({time:time,price:price});
  });
}, config.qrktobtcInterval)

// API
app.get('/api/qrktobtc', function(req, res){
  res.send(vals);
})

app.listen(config.appPort);