var request = require('request');
var favouritePosts;
var http = require('http');
var mongoose = require('mongoose');
var UserRecord = mongoose.model('UserRecord');
var OAuth = require('oauth').OAuth;

/*
 * 
 * GET Sample
 * 
 */

exports.root = function(req, res){
	res.send('Ok');
}

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
	
	oauth_consumer_key = 'N9lOZNmkdgTZ5JjaBUk4kg';
	oauth_consumer_secret = 'rzf0ooTDipql2yw4cdEI714gk5Qb3H45CYufo';
	oauth_access_token = 'dLaV14AwfBrlaMqDtz1Dw';
	oauth_access_token_secret = 'AE0Xr44fpXS5JtiWrOpbdtECMTFNf2DrMFs6RXEvP5Q';	
	
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
				recievedJSON = jsonObject.results;
				res.render('push_edition.ejs',{
					layout:true,
					locals:{favouritePosts: recievedJSON}
				}, function(err, print_html){
					console.log('The HTML to return' + print_html);				
					var params = {
					    html : print_html
					};
					// Authenticate against BERGcloud
					var oauth = new OAuth(
						'http://api.bergcloud.com',
						oauth_access_token,
						oauth_consumer_key,
						oauth_consumer_secret,
						'1.0',
						null,
						'HMAC-SHA1'
					);
					oauth.post(
					  "http://api.bergcloud.com/v1/subscriptions/f319a636cdde52df0d7707fbafd07752e3e91b1c/publish",
					  oauth_access_token, oauth_access_token_secret,
					  params, "multipart/form-data",
				      function (error, data, response2) {
				      if(error){
				          console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');

				      }else{
				          console.log('Something posted.\n');
				          console.log(response2+'\n');
				      }
				      });	
					res.send('done');		
			});
		};
	});
	};
};

exports.validateconfig = function(req,res){
	
	// Need to get the values subscription_id and endpoint added to the db
	// Added in the values that would be set in the subscription
	
	var config = JSON.parse(req.body.config);
	console.log(req.body.subscription_id);
	console.log(req.body.endpoint);
	new UserRecord({
		subscription_id : config['subscription_id'],
		endpoint : config['endpoint'],
		borough: config['borough'],
		postcode: config['postcode'],
		instance_name: config['instance_name'],
		updated_at : Date.now()
	}).save( function( err, record, count ){
		console.log('Record written to DB.');
		console.log('Record ID: '+record._id)
	});
	
	res.send('{"valid":true}');
};

exports.oauthTest = function(req,res){

	print_html = '<html><body><h1>Print from script Test.</h1></body></html>';
	
	oauth_consumer_key = 'N9lOZNmkdgTZ5JjaBUk4kg';
	oauth_consumer_secret = 'rzf0ooTDipql2yw4cdEI714gk5Qb3H45CYufo';
	oauth_access_token = 'dLaV14AwfBrlaMqDtz1Dw';
	oauth_access_token_secret = 'AE0Xr44fpXS5JtiWrOpbdtECMTFNf2DrMFs6RXEvP5Q';
	
	// Authenticate against BERGcloud
	var oauth = new OAuth(
		'http://api.bergcloud.com',
		oauth_access_token,
		oauth_consumer_key,
		oauth_consumer_secret,
		'1.0',
		null,
		'HMAC-SHA1'
	);
	
	var params = {
	    html : print_html
	};

	//function(url, oauth_token, oauth_token_secret, post_body, post_content_type, callback)
	
	oauth.post(
	  "http://api.bergcloud.com/v1/subscriptions/f319a636cdde52df0d7707fbafd07752e3e91b1c/publish",
	  oauth_access_token, oauth_access_token_secret,
	  params, "multipart/form-data",
      function (error, data, response2) {
      if(error){
          console.log('Error: Something is wrong.\n'+JSON.stringify(error)+'\n');

      }else{
          console.log('Something posted.\n');
          console.log(response2+'\n');
      }
      });	
	
	res.send('done');
};
