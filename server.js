var express = require('express');
var app = express();
var request = require('request');
var config = require('./config');
var parser = require('./parser');
var _ = require('underscore');
var mongoose = require('mongoose');

// models
var Qrk = require('./models/qrk');

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

// mongodb
mongoose.connect(config.db);

// --
var lastQrk = null;
setInterval(function(){
  parser.qrkToBtc(function(data){
    var found = lastQrk && (lastQrk.time == data.time);
    if(!found) {
      var qrk = new Qrk({
        currency:'BTC',
        price:data.price,
        timestamp:data.timestamp,
        volume:data.volume
      });
      qrk.save(function(){
        lastQrk = qrk;
      });
    }
    /*
      parser.btcToUsd(function(amount){
        vals.push({ time:time,
                    qrkToBtc:price,
                    BtcToUsd:amount
                  });
      });
    }*/
  });
}, config.qrktobtcInterval)

// API
app.get('/api/qrk', function(req, res){
  Qrk.find().exec(function(err, qrks){
    if(err) {
      return res.send({},500);
    }
    res.send(qrks);
  })
})

app.listen(config.appPort);