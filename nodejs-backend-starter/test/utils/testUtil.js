const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD_HASH =
  '$2a$10$2JWO3zQpgyBCWDBt6tcGN.pt0TUE15N9siDw.5j9ScJGfIs49J.5.';
process.env.ADMIN_ACCESS_TOKEN_SECRET = 'dummy-access-secret';
process.env.ADMIN_REFRESH_TOKEN_SECRET = 'dummy-refresh-secret';

let mongoServer;

async function connectTestDB() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
}

async function closeTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}

async function clearDB() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
}

module.exports = {
  connectTestDB,
  closeTestDB,
  clearDB
};
