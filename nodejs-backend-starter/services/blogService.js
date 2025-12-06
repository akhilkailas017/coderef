const Blog = require('../models/Blog');
const User = require('../models/User');

async function createPost(data, username) {
  if (!data.title || !data.content) {
    throw { status: 400, message: 'title and content are required' };
  }
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: 'User not found' };

  const post = await Blog.create({
    ...data,
    author: user._id
  });

  return post;
}

async function listPosts(queryParams) {
  const page = parseInt(queryParams.page || 1);
  const limit = parseInt(queryParams.limit || 10);
  const { tag, author, id } = queryParams;

  const query = {};
  if (tag) query.tags = tag;
  if (id) query._id = id;
  if (author) query.author = author;

  const totalRecords = await Blog.countDocuments(query);

  const data = await Blog.find(query)
    .populate('author', 'username name')
    .sort({ created_at: -1 })
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

async function getPost(id) {
  const post = await Blog.findById(id).populate('author', 'username name');

  if (!post) throw { status: 404, message: 'Post not found' };
  return post;
}

async function updatePost(id, updateData, username) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: 'User not found' };

  const post = await Blog.findOneAndUpdate(
    { _id: id, author: user._id },
    updateData,
    { new: true }
  );

  if (!post) throw { status: 404, message: 'Post not found or unauthorized' };

  return post;
}

async function deletePost(id, username) {
  const user = await User.findOne({ username });
  if (!user) throw { status: 404, message: 'User not found' };

  const post = await Blog.findOneAndDelete({
    _id: id,
    author: user._id
  });

  if (!post) throw { status: 404, message: 'Post not found or unauthorized' };

  return;
}

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost
};
