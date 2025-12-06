const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');

const { connectTestDB, closeTestDB, clearDB } = require('./utils/testUtil');

let app;

describe('user Routes', function () {
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

  it('should return 401 for invalid user login', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({ username: 'wrong', password: 'testpass' });
    expect(res.status).to.equal(401);
  });

  it('should register user successfully when give correct data', async () => {
    const res = await request(app).post('/user/register').send({
      username: 'test',
      name: 'test',
      email: 'test@gmail.com',
      password: 'test'
    });
    expect(res.status).to.equal(201);
    expect(res.body.message).eql('User registered successfully');
  });
});
