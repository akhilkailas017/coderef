const blogService = require('../services/blogService');

async function createPost(req, res) {
  try {
    const post = await blogService.createPost(req.body, req.user.username);

    return res.status(201).json({
      message: 'Blog post created',
      post
    });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function listPosts(req, res) {
  try {
    const posts = await blogService.listPosts(req.query, req.user.username);
    return res.json(posts);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function getPost(req, res) {
  try {
    const post = await blogService.getPost(req.params.id);
    return res.json(post);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function updatePost(req, res) {
  try {
    const post = await blogService.updatePost(
      req.params.id,
      req.body,
      req.user.username
    );

    return res.json({ message: 'Blog post updated', post });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

async function deletePost(req, res) {
  try {
    await blogService.deletePost(req.params.id, req.user.username);

    return res.json({ message: 'Blog post deleted' });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }
}

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost
};
