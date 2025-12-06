const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

const { connectTestDB, closeTestDB, clearDB } = require("./utils/testUtil");

let app;

describe("Admin Routes", function () {

  before(async () => {
    await connectTestDB();
    app = require("../index");
  });

  after(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearDB();
  });

  it("should return 401 for invalid admin login", async () => {
    const res = await request(app)
      .post("/admin/login")
      .send({ username: "wrong", password: "testpass" });
    
    expect(res.status).to.equal(401);
  });

  it("should login successfully with dummy admin values", async () => {
    const res = await request(app)
      .post("/admin/login")
      .send({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD_HASH });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("accessToken");
    expect(res.body).to.have.property("refreshToken");
  });

  it("should reject invalid refresh token", async () => {
    const res = await request(app)
      .post("/admin/refresh-token")
      .send({ token: "invalid" });

    expect(res.status).to.equal(403);
  });

});
