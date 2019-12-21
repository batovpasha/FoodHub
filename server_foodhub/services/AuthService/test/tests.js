'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const enableDestroy = require('server-destroy');
const server = require('../server');

chai.use(chaiHttp);

enableDestroy(server);

describe('Auth', () => {
  describe('/POST signUp', () => {
    it('should create new user', done => {
      chai.request(server)
        .post('/auth/signUp')
        .send({
          firstName: 'Pasha',
          lastName: 'Batov',
          email: 'batovpasha@gmail.com',
          password: '12345',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  // after(() => server.destroy());
});