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
          firstName: 'TestFirstName',
          lastName: 'TestLastName',
          email: `test-email${new Date().getTime()}@test.com`,
          password: 'test',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('/POST signIn', () => {
    it('should authenticate user and return token in response', done => {
      // Take current date and append it in milliseconds to user email for identification
      const date = new Date();

      /*
       * Firstly, make request to sign up new user and then make
       * a sign in request for current user
       */
      chai
        .request(server)
        .post('/auth/signUp')
        .send({
          firstName: 'TestFirstName',
          lastName: 'TestLastName',
          email: `test-email${date.getTime()}@test.com`,
          password: 'test',
        })
        .end((err, signUpResponse) => {
          chai
            .request(server)
            .post('/auth/signIn')
            .send({
              email: `test-email${date.getTime()}@test.com`,
              password: 'test',
            })
            .end((err, signInResponse) => {
              signInResponse.should.have.status(200);
              signInResponse.body.should.have.property('token');
              signInResponse.body.token.should.not.be.empty;
              done();
            });
        });
    });
  });

  describe('/GET tokenInfo', () => {
    it('should return token payload in response body', done => {
      // Take current date and append it in milliseconds to user email for identification
      const date = new Date();

      /*
       * Sign up new user, then make sign in request for current user to retrieve
       * token, after that make tokenInfo request to check token validity and
       * retrieve token payload
       */
      chai
        .request(server)
        .post('/auth/signUp')
        .send({
          firstName: 'TestFirstName',
          lastName: 'TestLastName',
          email: `test-email${date.getTime()}@test.com`,
          password: 'test',
        })
        .end((err, signUpResponse) => {
          // Make sign in request to retrieve token
          chai
            .request(server)
            .post('/auth/signIn')
            .send({
              email: `test-email${date.getTime()}@test.com`,
              password: 'test',
            })
            .end((err, signInResponse) => {
              const token = signInResponse.body.token;

              // Make tokenInfo request to check token validity and retrieve its payload
              chai
                .request(server)
                .get('/auth/tokenInfo')
                .set('Authorization', `Bearer ${token}`)
                .end((err, tokenInfoResponse) => {
                  tokenInfoResponse.should.have.status(200);

                  tokenInfoResponse.body.should.have.property('id');
                  tokenInfoResponse.body.should.have.property('exp');
                  tokenInfoResponse.body.should.have.property('iat');

                  done();
                });
            });
        });
    });
  });
});
