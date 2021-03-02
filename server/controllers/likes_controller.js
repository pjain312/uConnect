const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    if (req.body.type == 'Post') {
      likeable = await Post.findById(req.body.id).populate('likes');
    } else {
      likeable = await Comment.findById(req.body.id).populate('likes');
    }

    let existingLike = await Like.findOne({
      user: req.body.user,
      likeable: req.body.id,
      onModel: req.body.type,
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      let newLike = await Like.create({
        user: req.body.user,
        onModel: req.body.type,
        likeable: req.body.id,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.status(200).json({
      data: {
        deleted: deleted,
      },
      message: 'request successful',
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
