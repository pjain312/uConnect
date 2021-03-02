const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/uploads/users/avtars');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friendships',
      },
    ],
  },
  {
    timestamps: true,
  }
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', AVTAR_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

userSchema.statics.uploadedAvtar = multer({ storage: storage }).single('avtar');
userSchema.statics.avtarPath = AVTAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;
