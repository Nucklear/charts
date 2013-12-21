(function () {

			//Carga datos de últimas X horas de la DB
			/*
			var old_data = [];
			  $.getJSON("http://localhost:6060/btc",function(result){
    		  	$.each(result, function(key, value){
      				old_data.push([ new Date(key).getTime(), parseInt(value)]);
    			});
  			  });
  			*/


			var plot = document.getElementById('plot'), data = [], graph, offsetx = 8;  /* Add old data to the data array */
				
				function animate () {
				
				$.ajax({url:"https://api.bitcoinaverage.com/ticker/USD",success:function(result){
				    data.push([ new Date(result.timestamp).getTime(), parseInt(result.last)]);
				    $(function(){$(".price").text('$' + result.last);});
				    $(function(){$(".cap").text('$' + addCommas(result.last.toFixed(2)*12151025));});
				    console.log(result.last);
				  }});

				graph = Flotr.draw(plot, [ data ], {
					colors: ['#56a490'],
					shadowSize:0,
					fontColor: '#56a490',
				    yaxis : {
				    	title : '$USD',
				      	max : 1500,
				      	min: 0,
				    },
				    xaxis : {
				    	min: null,
						title : 'Time (UTC/GMT)',
		                tickDecimals: 2,
		                timeFormat: '%H:%M',
		                noTicks: 20,
		                mode : 'time',
		                labelsAngle : 50,
		                tickFormatter: function(x){
		                    var x = parseInt(x);
		                    var myDate = new Date(x);
		                    var string = myDate.getHours() + ":" + myDate.getMinutes();
		                    result = string;

		                    return string;}
				    },
				    mouse: {
				    	track:true,
				    	lineColor: '#485a70',
				    	trackFormatter: function(obj){return '$ ' + obj.y;},
				    	//sensibility:10
				    },
				    grid:{
				    	backgroundColor: 'white'
				    }
				  });
				
				setTimeout(function () {
					animate();
				}, 60000);
				}
			animate();

				function addCommas(nStr)
				{
					nStr += '';
					x = nStr.split('.');
					x1 = x[0];
					x2 = x.length > 1 ? '.' + x[1] : '';
					var rgx = /(\d+)(\d{3})/;
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
					}
					return x1 + x2;
				}
		})();