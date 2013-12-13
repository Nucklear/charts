var express = require('express');
var app = express();
var request = require('request');
var config = require('./config');
var parser = require('./parser');
var _ = require('underscore');

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

var vals = [];

// --
setInterval(function(){
  parser.qrkToBtc(function(price, time){
    var found = _.find(vals, function(val){
      return val.time == time;
    })
    console.log(found)
    if(!found) {
      parser.btcToUsd(function(amount){
        vals.push({ time:time,
                    qrkToBtc:price,
                    BtcToUsd:amount
                  });
        console.log(vals);
      })
    }
  });
}, config.qrktobtcInterval)

// API
app.get('/api/qrktobtc', function(req, res){
  res.send(vals);
})

app.listen(config.appPort);