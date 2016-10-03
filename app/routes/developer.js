
// Dependencies
var mongoose    = require('mongoose');
var ObjectId    = require('mongoose').Types.ObjectId; 
var Developer   = require('../models/developer');
var https       = require('https')


function calculatePrice(followers, public_repos, public_gists, following){
    console.info("Calculating price of developer.");

    //Weight averagewas used to calcaulate a price of one developer
    var weight_follower = followers*2
    var weight_following = following*2
    var weight_public_repos = public_repos*3
    var weight_public_gists = public_gists*3
    return ((weight_follower + weight_public_repos + weight_public_gists) / 10);
}
function dumpFromGitHub(since) {

	var options = {
		host: 'api.github.com',
        path: '/users?per_page=100&since=' + since,
        params: {
        	per_page: 100
        },
        headers: {
        	'user-agent': 'node.js'
        }
	}

	https
		.get(options, function(response){
			var body = '';
			var body2 = '';

			response.on('data', function(data){
				body += data;
			})

			response.on('end', function(data){
				var developers = JSON.parse(body)

				developers.forEach(function(elem){

					if (elem != undefined){
						var options2 = {
						    host: 'api.github.com',
						    path: '/users/' + elem['login'],
						    method: 'GET',
						    headers: {'user-agent': 'node.js'}
						};

						
						https
							.get(options2, function(resp){

								resp.on('data', function(d){
									body2 += d;
								})

								resp.on('end', function(data){
									var moreInfo = JSON.parse(body2)

									elem['followers'] = moreInfo['followers'];
		                            elem['public_repos'] = moreInfo['public_repos'];
		                            elem['public_gists'] = moreInfo['public_gists'];
		                            elem['email'] = moreInfo['email'];
		                            elem['name'] = moreInfo['name'];
		                            elem['price'] = calculatePrice(moreInfo['followers'],
	                                                               moreInfo['public_repos'],
	                                                               moreInfo['public_gists'],
	                                                               moreInfo['following'])
								})
							})	
					}
				})

				console.log(developers)
			})
		})

}	


// Opens App Routes
module.exports = function(app) {

    // HTTP Get
    app
        .get('/developers', (request, response) => {
            // Example: GET /developers
            // Fetch all orders mades along time
            
            console.log(new Date().toISOString() + "- Fetch all developers")


            
            var query = Developer.find({});
            query.exec(function(err, developers){
                if(err) {
                    console.log(new Date().toISOString() + " - Error: ", err);
                    response.send(err);
                } 

                if(developers.length == 0){
                	dumpFromGitHub(0); // Catch data again.

                	var q = Developer.find({});
                	q.exec(function(err, devs){
                		if(err) {
		                    console.log(new Date().toISOString() + " - Error: ", err);
		                    response.send(err);
		                } 

		                developers = devs;
                	})
                }
                // If no errors are found, it responseponds with a JSON of all users
                response.json(developers);
            });
        });


};