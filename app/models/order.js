

// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Creating Order collections
var OrderSchema = new Schema({
    developers: {type: Array, default: []},
    orderDate: Number,
    total: Number

});


var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;