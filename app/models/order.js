

// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var OrderSchema = new Schema({
    developers: {type: Array, default: []},
    total: Number

});


var Order = mongoose.model('Order', OrderSchema);
module.exports = Order;