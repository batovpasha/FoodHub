'use strict';

const server = require('../server');
const enableDestroy = require('server-destroy');

enableDestroy(server);

describe('Auth', () => {
  describe('/GET test', () => {
    it('should GET test', done => {
      done();
    });
  });
});