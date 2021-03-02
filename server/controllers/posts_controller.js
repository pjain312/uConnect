const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.body.user,
    });
    post = await post.populate('user').execPopulate();

    return res.status(200).json({ message: 'post created successfully' });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `error in creating post", ${err.message}` });
  }
};

module.exports.destroy = async function (req, res) {
  try {
    const id = req.query.id;
    const user = req.query.user;
    const post = await Post.findById(id);
    if (post.user == req.query.user) {
      await Like.deleteMany({ likeable: post, onModel: 'Post' });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.remove();

      await Comment.deleteMany({ post: req.query.id });
      return res.status(200).json({
        message: 'posts and associated comments deleted successfully!',
      });
    } else {
      return res.status(401).json({ message: 'You cannot delete this post!' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error in deleting post" ${err.message}` });
  }
};
