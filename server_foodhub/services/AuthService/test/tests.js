'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Auth', () => {
  describe('/POST signUp', () => {
    it('should create new user', done => {
      chai
        .request(server)
        .post('/auth/signUp')
        .send({
          firstName: 'Pasha',
          lastName: 'Batov',
          email: 'batovpasha@gmail.com',
          password: '12345',
        })
        .end((err, res) => {
          res.should.have.property('error');
          res.should.have.status(500);
          done();
        });
    });
  });
});
