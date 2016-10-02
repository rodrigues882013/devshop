process.env.NODE_ENV = 'test';

var mongoose    = require('mongoose');
var Order       = require('../models/order');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Orders', () => {
    
    beforeEach((done) => { //Before each test we empty the database
        Order.remove({}, (err) => { 
            done();         
        });     
    });


    // Testing if GET orders returning a collection
    describe('/GET orders', () => {

        it('it should GET all the orders', (done) => {
            chai.request(server)
                .get('/orders')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
            });
        });
    });

    // Testing ig GET order returning atomic registers
    describe('/GET order', () => {

      // Assertion to register does not exist
      it('it should GET a simple the order that does not exist', (done) => {
          chai.request(server)
              .get('/order/45445454')
              .end((err, res) => {
                  res.should.have.status(500);
                  done();
              });

      // Assertion to register that exist        
      it('it should GET a simple the order', (done) => {        
          chai.request(server)
              .get('/order/57f00de51dfd656143000001')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
              });
            });
      });

    });

    // Testing POST request, inserting a simple order in mongo
    describe('/POST order', (done) => {
      
        var order = {
                total: 3000,
                developers: [
                    {
                      login: "defunkt",
                      id: 2,
                      avatar_url: "https://avatars.githubusercontent.com/u/2?v=3",
                      gravatar_id: "",
                      url: "https://api.github.com/users/defunkt",
                      html_url: "https://github.com/defunkt",
                      followers_url: "https://api.github.com/users/defunkt/followers",
                      following_url: "https://api.github.com/users/defunkt/following{/other_user}",
                      gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
                      starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
                      subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
                      organizations_url: "https://api.github.com/users/defunkt/orgs",
                      repos_url: "https://api.github.com/users/defunkt/repos",
                      events_url: "https://api.github.com/users/defunkt/events{/privacy}",
                      received_events_url: "https://api.github.com/users/defunkt/received_events",
                      type: "User",
                      site_admin: true,
                      followers: 15736,
                      public_repos: 107,
                      public_gists: 273,
                      email: "chris@github.com",
                      name: "Chris Wanstrath",
                      price: 2000,
                      workedHour: 1
                    },
                    {
                      login: "malcomx",
                      id: 3,
                      avatar_url: "https://avatars.githubusercontent.com/u/2?v=3",
                      gravatar_id: "",
                      url: "https://api.github.com/users/malcomx",
                      html_url: "https://github.com/malcomx",
                      followers_url: "https://api.github.com/users/malcomx/followers",
                      following_url: "https://api.github.com/users/malcomx/following{/other_user}",
                      gists_url: "https://api.github.com/users/malcomx/gists{/gist_id}",
                      starred_url: "https://api.github.com/users/malcomx/starred{/owner}{/repo}",
                      subscriptions_url: "https://api.github.com/users/malcomx/subscriptions",
                      organizations_url: "https://api.github.com/users/malcomx/orgs",
                      repos_url: "https://api.github.com/users/malcomx/repos",
                      events_url: "https://api.github.com/users/malcomx/events{/privacy}",
                      received_events_url: "https://api.github.com/users/malcomx/received_events",
                      type: "User",
                      site_admin: true,
                      followers: 156,
                      public_repos: 10,
                      public_gists: 2783,
                      email: "malcomx@github.com",
                      name: "Chris Wanstrath",
                      price: 500,
                      workedHour: 2
                    }
                ]
        }

        chai.request(server)
            .post('/order')
            .send(order)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                
                done();
        });
    });       
});


