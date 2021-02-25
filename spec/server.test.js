const request = require('supertest');
const app = require('../server');

describe('GET /api', function() {
  it('responds with json', function(done) {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
});
