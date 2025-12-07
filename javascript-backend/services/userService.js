const User = require('../models/User');

async function listUsers(queryParams) {
  const page = parseInt(queryParams.page || 1);
  const limit = parseInt(queryParams.limit || 10);
  const { username, name, id, email } = queryParams;

  const query = {};
  if (username) query.username = username;
  if (name) query.name = name;
  if (email) query.email = email;
  if (id) query._id = id;

  const totalRecords = await User.countDocuments(query);

  const data = await User.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    data
  };
}

module.exports = {
  listUsers
};
