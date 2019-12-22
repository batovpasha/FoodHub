'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User service', () => {
  describe('GET /user/me', done => {
    it('should return user profile', done => {
      // Take current date and append it in milliseconds to user email for identification
      const date = new Date();

      /*
       * Firstly, make request to sign up new user and then make
       * a sign in request for current user
       */
      chai
        .request(env.services.AUTH_SERVICE_URL)
        .post('/auth/signUp')
        .send({
          firstName: 'TestFirstName',
          lastName: 'TestLastName',
          email: `test-email${date.getTime()}@test.com`,
          password: 'test',
        })
        .end((err, signUpResponse) => {
          chai
            .request(env.services.AUTH_SERVICE_URL)
            .post('/auth/signIn')
            .send({
              email: `test-email${date.getTime()}@test.com`,
              password: 'test',
            })
            .end((err, signInResponse) => {
              const token = signInResponse.body.token;

              chai 
                .request(server)
                .get('/user/me')
                .set('Authorization', `Bearer ${token}`)
                .end((err, userProfileResponse) => {
                  userProfileResponse.should.have.status(200);

                  userProfileResponse.body.should.have.property('id');
                  userProfileResponse.body.should.have.property('first_name');
                  userProfileResponse.body.should.have.property('last_name');
                  userProfileResponse.body.should.have.property('email');
                  userProfileResponse.body.should.have.property('role');

                  done();
                });
            });
        });
    });
  });
});
