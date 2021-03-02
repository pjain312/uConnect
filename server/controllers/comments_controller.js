const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.posts);

    if (post) {
      let comment = await Comment.create({
        content: req.body.contents,
        post: req.body.posts,
        user: req.body.id,
      });
      comment = await comment.populate('user', 'post').execPopulate();
      post.comments.push(comment);
      post.save();

      return res
        .status(200)
        .json({ message: 'Comment Created!!', data: comment });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in creating comment", ${err.message}` });
  }
};

module.exports.destroy = async (req, res) => {
  try {
    let comment = await Comment.findById(req.query.id);

    let postId = comment.post;
    let post = await Post.findById(postId);
    let userId = post.user;
    if (userId == req.query.user || comment.user == req.query.user) {
      await Like.deleteMany({ likeable: comment, onModel: 'Comment' });

      comment.remove();
      let postId = comment.post;
      let post = await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.query.id },
      });
      return res.status(200).json({ message: 'Comment Deleted!' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: `error in deleting comment", ${err.message}` });
  }
};
