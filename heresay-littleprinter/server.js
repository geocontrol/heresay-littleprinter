var express = require('express'),
    handler = require('./handler.js'),
    littleprinter = require('littleprinter');

var app = express();
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
// mongoose setup
require('./db');
var mongo;

app.configure(function(){
  app.set('port', process.env.VCAP_APP_PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
  mongo = {
			"hostname":"localhost",
	        "port":27017,
	        "username":"",
	        "password":"",
	        "name":"",
	        "db":"heresay_lp"
	    };
//  mongoose.connect('mongodb://localhost/test');
});

app.configure('production', function(){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	mongo = env['mongodb-1.8'][0]['credentials'];
})

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}

var mongourl = generate_mongo_url(mongo);

console.log('MongoURL: ' + mongourl);

mongoose.connect(mongourl);


var heresay = require('./heresay.js')

app.get('/', heresay.root);
app.get('/sample', heresay.sample);
app.get('/edition', heresay.edition);
app.post('/validate_config', heresay.validateconfig);
app.get('/push', heresay.push);
app.get('/oauth', heresay.oauthTest);

littleprinter.setup(app, handler);



app.listen(port);
console.log('Server started on: http://localhost:' + port);
