
//Set up dependencies
var express     = require('express');
var app         = express();
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');


//Sets the connection to MongoDB
mongoose.connect('mongodb://localhost/test');

//Set up port when application listen
var port = 8000;

//Parsing
app.use(express.static(__dirname + '/public/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json


// Routes
require('./app/routes.js')(app);

// Listen (start app)
app.listen(port);
console.log('App listening on port ' + port);


