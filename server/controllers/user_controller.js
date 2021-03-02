const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.profile = async (req, res) => {
  try {
    const id = req.query.id; //or req.user._id
    const user = await User.findById(id);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: `error in getting user", ${err.message}` });
  }
};
module.exports.update = async function (request, response) {
  try {
    if (request.body.user == request.query.id) {
      let user = await Users.findById(request.query.id);

      Users.uploadedAvtar(request, response, function (error) {
        if (error) {
          console.log('error');
          return;
        }
        user.name = request.body.name;
        user.email = request.body.email;
        if (request.file) {
          if (
            user.avtar &&
            fs.existsSync(path.join(__dirname, '..', user.avtar))
          ) {
            fs.unlinkSync(path.join(__dirname, '..', user.avtar));
          }
          user.avtar = Users.avtarPath + '/' + request.file.filename;
        }

        user.save();
        return response
          .status(200)
          .json({ message: 'Profile updated Successfully' });
      });
    } else {
      return response.status(401).json({ message: 'UnAuthorized' });
    }
  } catch (error) {
    console.log('Error', error);
    return;
  }
};

module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirmPassword) {
      console.log('Passwords do not match!!');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res
          .status(400)
          .json({ message: 'error in finding user in signing up' });
      }
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            return res
              .status(400)
              .json({ message: 'error in creating a user while signing up' });
          }
          return res.status(200).json({ message: 'User created successfully' });
        });
      } else {
        return res.status(400).json({ message: 'User already exists' });
      }
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: `error in adding new User", ${err.message}` });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.json(400, {
        message: 'Invalid Username or Password',
      });
    }
    return res.json(200, {
      message: 'Sign In successful, here is your token, please keep it safe ',
      data: {
        user: user,
        token: jwt.sign(user.toJSON(), 'secret', { expiresIn: '100000' }),
      },
    });
  } catch (err) {
    console.log('******', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
