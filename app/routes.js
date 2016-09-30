

// Dependencies
var mongoose    = require('mongoose');
var ObjectId    = require('mongoose').Types.ObjectId; 
var Order       = require('./models/order');


// Opens App Routes
module.exports = function(app) {

    // HTTP Get
    app
        .get('/orders', function(request, response){
            // Example: GET /orders
            // Fetch all orders mades along time

            console.log("Fetch all orders mades along time")
            var query = Order.find({});
            query.exec(function(err, order){
                if(err) {
                    console.log("Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(order);
            });
        })

        .get('/orders/:order_id', function(request, response) {
            // Example: GET /orders/123
            // Fetch register with _id=123

            var order_id = request.params.order_id;
            console.info("Fetch OrderId: %s", order_id);
            var query = Order.find({_id: new ObjectId(order_id)});

            query.exec(function(err, order){
                if(err) {
                    console.log("Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(order);
            });
            
        });


    // HTTP Post
    // --------------------------------------------------------
    app.post('/orders', function(request, response){

        // Creates a new order based on the Mongoose schema and the post
        var order = new Order(request.body);

        // New Order is saved in the db.
        order.save(function(err){
            if(err){
                console.log("Error: ", err);
                response.send(err);
            }

            response.json(request.body);
        });

    });

};


