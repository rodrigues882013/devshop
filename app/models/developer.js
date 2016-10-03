

// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Creating Order collections
var DeveloperSchema = new Schema({
    login: String,
    id: Number,
    avatar_url: String,
    gravatar_id: String,
    url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    gists_url: String,
    starred_url: String,
    subscriptions_url: String,
    organizations_url: String,
    repos_url: String,
    events_url: String,
    received_events_url: String,
    type: String,
    site_admin: Boolean,
    followers: Number,
    public_repos: Number,
    public_gists: Number,
    email: String,
    name: String,
    price: Number,
    workedHour: Number
    

});


var Developer = mongoose.model('Developer', DeveloperSchema);
module.exports = Developer;