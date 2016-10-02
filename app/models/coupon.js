

// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Creating Order collections
var CouponSchema = new Schema({
    code: String,
});


var Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;