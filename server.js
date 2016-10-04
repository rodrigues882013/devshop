
//Set up dependencies
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var config      = require('config');


//Sets the connection to MongoDB
var options = { 
	server: {
		socketOptions: {
	  		keepAlive: 1, connectTimeoutMS: 30000 
	  	}
	}, 
    replset: {
    	socketOptions: {
    		keepAlive: 1, 
    		connectTimeoutMS : 30000 
    	} 
    } 
}; 

console.log(config.DBHost)
mongoose.connect(config.DBHost, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Set up port when application listen
var port = process.env.PORT;

//Parsing
app.use(express.static(__dirname + '/public/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json


// Routes
require('./app/routes/order.js')(app);
require('./app/routes/coupon.js')(app);
require('./app/routes/developer.js')(app);

// Listen (start app)
app.listen(port || 8080);
console.log('App listening on port ' + port);

module.exports = app; // for testing


