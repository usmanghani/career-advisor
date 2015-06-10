
var fs       = require('fs');
var system   = require('system');
var page   = require('webpage').create();


var arg      = system.args[1];
var filename = "category_"+arg+".txt"; 
var ToInsert = "";

for (var i=1; i<=100; i++)
	for (var j=1; j<=100; j++)
		for (var k=1; k<=100; k++)
		{ 
	      var tmp_i = '' + i;
		  var tmp_j = '' + j;
		  var tmp_k = '' + k;
		
		  ToInsert+= "https://www.linkedin.com/directory/people-"+arg+"-"+tmp_i+"-"+tmp_j+"-"+tmp_k+"/\r\n";
		}
		
//console.log(ToInsert);		

fs.write(filename, ToInsert, 'w');

phantom.exit();  