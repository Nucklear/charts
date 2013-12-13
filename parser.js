var config = require('./config');
var request = require('request');

var getQrkValue = function(cb){
  request({url:config.qrktobtcURL, json:true}, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      // Check json validity
      if(body &&
        body.return &&
        body.return.markets &&
        body.return.markets.QRK &&
        body.return.markets.QRK.lasttradeprice )
      var price = body.return.markets.QRK.lasttradeprice;
      var timestamp = body.return.markets.QRK.lasttradetime;
      cb && cb(price, timestamp);
    }
  })
}
module.exports = {
  getQrkValue:getQrkValue
}