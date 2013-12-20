var config = require('./config');
var request = require('request');
var Btc = require('./models/btc');
var Log = require('log');

var log = new Log('info');

var qrkToBtc = function(cb){
  request({url:config.qrktobtcURL, json:true}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      // Check json validity
      if(body &&
        body.return &&
        body.return.markets &&
        body.return.markets.QRK &&
        body.return.markets.QRK.lasttradeprice ) {

        var price = body.return.markets.QRK.lasttradeprice;
        var timestamp = body.return.markets.QRK.lasttradetime;
        var volume = body.return.markets.QRK.volume;
        cb && cb({
          price:price,
          time:timestamp,
          volume:volume
        });
      }
    }
  })
}

var btcParser = function(cb){
  request({url:config.btctousdUrl, json:true}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      // Check json validity
      if(body &&
        body.last &&
        body.timestamp && 
        body.total_vol){
        var parsed = {
          price:body.last,
          time:body.timestamp,
          amount:body.total_vol
        }
        cb && cb(parsed);
      } else {
        log.error("Error parding Btcs", body);
      }
    }
  })
}

var startBtc = function(){
  setInterval(function(){
    btcParser(function(item){
      var btc = new Btc(item);
      btc.save(function(err){
        if(!err){
          log.info("New btc data stored", item);
        }
      })
    })
  }, config.btcInterval)
}

module.exports = {
  startBtc:startBtc
}