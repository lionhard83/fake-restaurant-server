const assert = require('assert');
const request = require('supertest');
const chai = require('chai');
const should = chai.should();
const app = require('./app');

describe('admin', function() {
  it('list of orders ', function(done) {
    request(app)
      .get('/admin/orders?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        assert.equal(res.body.length, 3);
        if (err) return done(err);
        done();
      });
  });

  it('list of orders not auth ', function(done) {
    request(app)
      .get('/admin/orders')
      .set('Accept', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('delete order ', function(done) {
    request(app)
      .delete('/admin/orders/1?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body.length, 1);
        request(app)
          .get('/admin/orders?token=admin')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, res) {
            res.body.should.have.lengthOf(2);
            if (err) return done(err);
            done();
          });
      });
  });

  it('get profit ', function(done) {
    request(app)
      .get('/admin/profit?token=admin')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.profit.should.be.a('number');
        done();
      });
  });
});
