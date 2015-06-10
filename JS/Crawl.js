//console.log('Starting Crawling');

var Error  = false;
var page   = require('webpage').create();
var system = require('system');
var fs = require('fs');


var CrawlerDB = 'category_'  + system.args[1] + '.txt';
var DirDB     = 'directory_' + system.args[1] + '.txt';
var Processed = 'processed_' + system.args[1] + '.txt';

var CrawlerTmp=  'crawl_'+system.args[1]+'.tmp';

var url = "";



if (!fs.exists(CrawlerDB))
  url    = 'https://www.linkedin.com/directory/people-'+system.args[1];
else
{
	var content = fs.open(CrawlerDB, 'r');
	url = content.readLine();
	
	//while(!content.atEnd())
//	{
	//	fs.write(CrawlerTmp, content.readLine()+"\r\n", 'a');
//	}
	
	
	var tmpData = fs.read(CrawlerDB);
	tmpData = tmpData.split("\n").slice(1).join("\n");
	fs.write(CrawlerDB, tmpData, 'w');
	
	//fs.remove(CrawlerTmp);
}



console.log("Crawling : "+url);





if (url.indexOf("/directory/people")>0)
{	
	// /directory/people crawler
	console.log("/directory/people crawler working\n");

	page.open(url, function (status) {
	  console.log("Status: " + status);

	  if(status === "success") {
		var link = page.evaluate(function() {
		
		//section last
		var section = document.getElementsByClassName("section last")[0];
		
		if (section){
			var columns = section.getElementsByClassName("columns")[0];
			
			// All links
			var atags   = section.getElementsByTagName("a");
			var allLinks = [];
			for (var i=0; i<atags.length; i++)
				allLinks[i]=atags[i].href;
			return allLinks;
			}
			
		else{
			Error = true;
			return "Error : Possible IP ban or wrong link";
			}
		});
		
		if (!Error)
		{
		
		 for (var i=0; i<link.length; i++)
		  {
			 if (link[i].indexOf("/directory/people")>0)
			 {
				 // Expanding
				 fs.write(CrawlerDB, link[i]+"\r\n", 'a');
				
			 }
			 else if (link[i].indexOf("/dir/")>0)
			 {
				 // dir with same names
				// fs.write(DirDB, link[i]+"\r\n", 'a');
				fs.write(CrawlerDB, link[i]+"\r\n", 'a');
			 }
			 else
			 {
				//processed 
				fs.write(Processed, link[i]+"\r\n", 'a');
			 }
		  }	
		}
		
		else 
			console.log(link); 
		}
		
		

	phantom.exit();  
	});	
}

else if (url.indexOf("/dir/")>0)
{
	// /dir/ crawler
	console.log("/dir/ crawler working\n");
	
	page.open(url, function (status) {
	  console.log("Status: " + status);

	  if(status === "success") {
		var links = page.evaluate(function() {
		
		//content-wrapper
		var con_wrapper = document.getElementsByClassName("content-wrapper")[0];
		
		if (con_wrapper){
			var photos = con_wrapper.getElementsByClassName("photos")[0];
			
			// All links
			var atags   = photos.getElementsByTagName("a");
			var allLinks = [];
			for (var i=0; i<atags.length; i++)
			allLinks[i]=atags[i].href;
			
			return allLinks;
			}
			
		else{
			Error=true;
			return "Error : Possible IP ban or wrong link";
			}
		});
		
		if (!Error)
		  for (var i=0; i<link.length; i++)
		     fs.write(Processed, link[i]+"\r\n", 'a');
		
		else
		   console.log(link);
		}
		
		

	phantom.exit();  
	});	
	
	
	
	
}

