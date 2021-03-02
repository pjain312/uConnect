const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async (req, res) => {
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
        populate: {
          path: 'likes',
        },
      })
      .populate('likes');
    let users = await User.find({});
    return res.status(200).json({ posts: posts, users: users });
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in getting users and posts", ${err.message}` });
  }
};
