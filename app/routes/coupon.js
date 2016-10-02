

// Dependencies
var mongoose    = require('mongoose');
var ObjectId    = require('mongoose').Types.ObjectId; 
var Coupon       = require('../models/coupon');


// Opens App Routes
module.exports = function(app) {

    // HTTP Get
    app
        .get('/coupons', function(request, response){
            // Example: GET /coupons
            // Fetch all orders mades along time
            
            console.log(new Date().toISOString() + "- Fetch all cupons mades along time")
            var query = Coupon.find({});
            query.exec(function(err, coupon){
                if(err) {
                    console.log(new Date().toISOString() + " - Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(coupon);
            });
        })


        .get('/coupon/:code', function(request, response) {
            // Example: GET /coupon/vtex2016
            // Fetch register with code=vtex2016
            
            var code = request.params.code;
            console.info(new Date().toISOString() + " - Validating Coupon: %s", code);
            var query = Coupon.find({code: code});

            query.exec(function(err, coupon){
                if(err) {
                    console.log(new Date().toISOString() + " - Error: ", err);
                    response.send(err);
                }
                // If no errors are found, it responseponds with a JSON of all users

                console.log(coupon)
                if (coupon.length > 0)
                    response.json({isValid: true});
                else
                    response.json({isValid: false});
            });
            
        });

};


