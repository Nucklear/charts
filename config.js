module.exports = {
	appPort:6060,

	qrktobtcURL:'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=71',
	qrktobtcInterval:1000*60, // one minute

	btctousdUrl:'https://api.bitcoinaverage.com/ticker/USD',
	btcInterval: 5000*60, // 5 minutes 
	db:'mongodb://localhost/currencyCharts',
}