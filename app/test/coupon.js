process.env.NODE_ENV = 'test';

var mongoose    = require('mongoose');
var Coupon       = require('../models/coupon');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server');
var should = chai.should();

chai.use(chaiHttp);

  describe('coupons', () => {
    beforeEach((done) => { //Before each test we empty the database
        Coupon.remove({}, (err) => { 
           done();         
        });     
    });


    describe('/GET coupons', () => {

        it('it should GET all the coupons', () => {
          chai.request(server)
              .get('/coupons')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    describe('/GET coupon', () => {

        it('it should GET all the coupons', (done) => {
          chai.request(server)
              .get('/coupon/45445454')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                  res.body.should.have.property('isValid');
                  res.body.should.have.property('isValid').eql(false);
                  
                  
                done();
              });

          chai.request(server)
              .get('/coupon/SHIPIT')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('Object');
                  res.body.should.have.property('isValid');
                  res.body.should.have.property('isValid').eql(true);
                  
                  
                done();
              });
        });
    });

  });


