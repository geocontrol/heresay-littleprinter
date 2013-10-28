var request = require('request');
var favouritePosts;
var http = require('http');

/*
 * 
 * GET Sample
 * 
 */

exports.sample = function(req, res){
	
	// Get the JSON from heresay.org.uk/api/get_recent_favourites.php
	//request.get('http://www.heresay.org.uk/api/get_recent_favourites.php', function (error, response, body) {
		//request.get('http://heresay.org.uk/api/get_recent_updates.php?lat=51.45967697948443&lng=-0.12342899999998735&tags=', function (error, response, body) {
	request.get('http://heresay.org.uk/api/get_recent_updates.php?borough=Kensington%20and%20Chelsea%20Borough%20Council', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body) // Output response to console
			jsonObject = JSON.parse(body);
			
			//var returnedHTML = "";
			var borough = "Lambeth Borough Council";
			//var borough = req.params.borough;
			//jsonObject.results.forEach(function(item, index){
			//	console.log(index);
			//	console.log(jsonObject.results[index]['title']);
				
				// Build up the HTML for each entry
			//	returnedHTML = returnedHTML + "<div>";
			//	returnedHTML = returnedHTML + "<h2>" + jsonObject.results[index]['title'] + "</h2>";
			//	returnedHTML = returnedHTML + "</div>";
			//});
			//for(var resultObject in jsonObject.results){
			//	console.log(resultObject[0]['title']);
			//}
			
			
			//recievedJSON = returnedHTML;
			recievedJSON = jsonObject.results;
			res.render('sample.ejs',{
				layout:true,
				locals:{favouritePosts: recievedJSON, borough: borough}
			});
		}
	});	
};

exports.edition = function(req, res){
	
	res.set({
		'ETag': '123456'
	});
	
	if (req.param('test') == "true") {
		// return something valid for the validator
		
		res.render('validator.ejs',{
			layout:true
		});
	} else {
		var postcode = String(req.param('postcode'));
		var postcode_param = postcode.replace(" ","");
		request.get('http://heresay.org.uk/api/get_recent_updates.php?borough=Kensington%20and%20Chelsea%20Borough%20Council', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body) // Output response to console
				jsonObject = JSON.parse(body);
			
				//recievedJSON = returnedHTML;
				recievedJSON = jsonObject.results;
				res.render('edition.ejs',{
					layout:true,
					locals:{favouritePosts: recievedJSON, postcode: postcode}
				});
			}
		});	
	}
};

exports.push = function(req, res){
	
	res.set({
		'ETag': '123456'
	});
	
	if (req.param('test') == "true") {
		// return something valid for the validator
		
		res.render('validator.ejs',{
			layout:true
		});
	} else {
		request.get('http://heresay.org.uk/api/get_recent_updates.php?borough=Kensington%20and%20Chelsea%20Borough%20Council', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body) // Output response to console
				jsonObject = JSON.parse(body);
			
				//recievedJSON = returnedHTML;
				recievedJSON = jsonObject.results;
				res.render('push_edition.ejs',{
					layout:true,
					locals:{favouritePosts: recievedJSON}
				}, function(err, printhtml){
					printhtml = 'html=<html><body><h1>Print from script Test.</h1></body></html>';
					console.log('The HTML to return' + printhtml);
					request.post('http://remote.bergcloud.com/playground/direct_print/833KTA6TSEPC').form({html:printhtml});
				});
				res.send('ok');
			}
		});
		
			
	}
};


exports.validateconfig = function(req,res){
	
	res.send('{"valid":true}');
};