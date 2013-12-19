var config = require('./config');
var request = require('request');

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

var btcToUsd = function(cb){
  request({url:config.btctousdUrl, json:true}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      // Check json validity
      if(body &&
        body.amount)
      var amount = body.amount;
      cb && cb(amount);
    }
  })
}

module.exports = {
  qrkToBtc:qrkToBtc,
  btcToUsd:btcToUsd
}