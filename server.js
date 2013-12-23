var express = require('express');
var app = express();
var request = require('request');
var config = require('./config');
var parser = require('./parser');
var _ = require('underscore');
var mongoose = require('mongoose');
var Log = require('log');

// models
var Qrk = require('./models/qrk');
var Btc = require('./models/btc');

// Configuration

var log = new Log('info');

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

// mongodb
mongoose.connect(config.db);

// --
/*
var lastQrkTime = null;
setInterval(function(){
  parser.qrkToBtc(function(data){
    var found = lastQrkTime && (lastQrkTime == data.time);
    if(!found) {
      var qrk = new Qrk({
        currency:'BTC',
        price:data.price,
        time:new Date(data.timestamp),
        volume:data.volume
      });
      qrk.save(function(){
        lastQrkTime = data.time;
      });
    }
    /*
      parser.btcToUsd(function(amount){
        vals.push({ time:time,
                    qrkToBtc:price,
                    BtcToUsd:amount
                  });
      });
    }
  });
}, config.qrktobtcInterval)
*/

parser.startBtc();

// Helpers
var modelsToJson = function(models){
  var data = [];
  _.each(models, function(model){
    data.push([model.price, model.time])
  });
  return data;
}

// API
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.get('/api/btc', function(req, res){
  Btc.find().exec(function(err, btcs){
    if(err) {
      return res.send({},500);
    }
    res.send(modelsToJson(btcs));
  })
});

app.get('/api/qrk', function(req, res){
  Qrk.find().exec(function(err, qrks){
    if(err) {
      return res.send({},500);
    }
    res.send(qrks);
  })
})

app.listen(config.appPort);
log.info("Server started on port:"+config.appPort);