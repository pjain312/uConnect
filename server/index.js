const mongoose = require('mongoose');
var express = require('express');
const path = require('path');
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-Strategy');
const passportGoogle = require('./config/passport-googleouth-Strategy');
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/', require('./routes/index'));

app.listen(port, function (err) {
  if (err) {
    console.log('error in running the server', err);
  }

  console.log('Server is running on port', port);
});
