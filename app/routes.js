

// Dependencies
var mongoose    = require('mongoose');
var Order       = require('./models/order');


// Opens App Routes
module.exports = function(app) {

    // GET Routes
    app.get('/orders', function(request, response){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Order.find({});
        query.exec(function(err, order){
            if(err)
                response.send(err);

            // If no errors are found, it responseponds with a JSON of all users
            response.json(order);
        });
    });

    app.get('/orders/:order_id', function(request, response) {

    });


    // POST Routes
    // --------------------------------------------------------
    app.post('/orders', function(request, response){

        // Creates a new order based on the Mongoose schema and the post
        var order = new Order(request.body);

        // New Order is saved in the db.
        order.save(function(err){
            if(err)
                response.send(err);

            response.json(request.body);
        });

    });

};


