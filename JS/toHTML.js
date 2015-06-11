var page   = require('webpage').create();
var system = require('system');
var fs = require('fs');

var directory = "HTML_category_"+system.args[1];
var Processed = 'processed_' + system.args[1] + '.txt';
var HTML_file = "";

// Reading and removing first line from processed links
if (fs.exists(Processed))
{
	var content = fs.open(Processed, 'r');
	url = content.readLine();
	var tmpData = fs.read(Processed);
	tmpData = tmpData.split("\n").slice(1).join("\n");
	fs.write(Processed, tmpData, 'w');
}
else
{
	console.log("Processed File not found !!");	
	phantom.exit();  
}


if (!fs.isDirectory(directory) )
   fs.makeDirectory(directory);


// Removing special characters
HTML_file = url.replace(/[^a-z0-9\s]/gi, '', "");
HTML_FILE_PATH = directory+"\\"+HTML_file;


// Load and save HTML of that URL
console.log("Saving HTML : "+url);	
page.open(url, function (status) {
	  console.log("Status: " + status);

	  if(status === "success") {
	      if (!fs.exists(HTML_FILE_PATH+".html"))
		    fs.write(HTML_FILE_PATH+".html", page.content, 'w');
		  else
		  {		var i = 0;
			  while (fs.exists(HTML_FILE_PATH+"_"+i+".html"))
				  i++;
			  
			  fs.write(HTML_FILE_PATH+"_"+i+".html", page.content, 'w');
		  }
	  }
	phantom.exit();  
});