

// Dependencies
var mongoose    = require('mongoose');
var ObjectId    = require('mongoose').Types.ObjectId; 
var Order       = require('../models/order');
var https        = require('https');



// Opens App Routes
module.exports = function(app) {

    // HTTP Get
    app
        .get('/orders', function(request, response){
            // Example: GET /orders
            // Fetch all orders mades along time
            
            console.log(new Date().toISOString() + "- Fetch all orders mades along time")
            var query = Order.find({});
            query.exec(function(err, order){
                if(err) {
                    console.log(new Date().toISOString() + " - Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(order);
            });
        })

        .get('/order/:order_id', function(request, response) {
            // Example: GET /orders/123
            // Fetch register with _id=123

            var order_id = request.params.order_id;
            console.info(new Date().toISOString() + " - Fetch OrderId: %s", order_id);
            var query = Order.find({_id: new ObjectId(order_id)});

            query.exec(function(err, order){
                if(err) {
                    console.log(new Date().toISOString() + " - Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(order);
            });
            
        });


    // HTTP Post
    // --------------------------------------------------------
    app.post('/order', function(request, response){

        console.log(new Date().toISOString() + " - POST request")
        console.log(new Date().toISOString() + " - " + JSON.stringify(request.body))


        // Creates a new order based on the Mongoose schema and the post
        var order = new Order(request.body);

        // New Order is saved in the db.
        order.save(function(err){
            if(err){
                console.log(new Date().toISOString() + " - Error: ", err);
                response.send(err);
            }

            console.log(new Date().toISOString() + " - Order saving with successfull");
            response.json(order);
            
        });

    });

};


