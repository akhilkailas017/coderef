const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const { connectTestDB, closeTestDB, clearDB } = require('./utils/testUtil');

let app;

describe('Admin Routes', function () {
  before(async () => {
    await connectTestDB();
    app = require('../index');
  });

  after(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it('should return 401 for invalid admin login', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'wrong', password: 'testpass' });
    expect(res.status).to.equal(401);
  });

  it('should login successfully original admin values', async () => {
    const res = await request(app).post('/admin/login').send({
      username: 'admin',
      password: 'admin'
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
    expect(res.body).to.have.property('refreshToken');
  });

  it('should reject invalid refresh token', async () => {
    const res = await request(app)
      .post('/admin/refresh-token')
      .send({ token: 'invalid' });
    expect(res.status).to.equal(403);
  });

  it('should accept valid refresh token', async () => {
    const loginRes = await request(app)
      .post('/admin/login')
      .send({ username: 'admin', password: 'admin' });
    const refreshToken = loginRes.body.refreshToken;
    const res = await request(app)
      .post('/admin/refresh-token')
      .send({ token: refreshToken });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('accessToken');
  });
});
