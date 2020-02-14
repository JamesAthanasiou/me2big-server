const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.body.username
    });
    let {id, username, email} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch) {
      let token = jwt.sign({
        id,
        username,
        email
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        email,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid username and/or password"
      });
    }
  } catch(err) {
    return next({
      status: 400,
      message: "Invalid username and/or password"
    });
  }
}

// Signup
exports.signup = async function (req, res, next){
  try {
    let user = await db.User.create(req.body);
    let { id, username, email } = user;
    let token = jwt.sign({
      id,
      username,
      email
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      email,
      token
    });
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'Sorry, this username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

// Check user is authenticated
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decode){
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please login first"
        });
      }
    });
  } catch(err) {
    return next({
      status: 401,
      message: "Please login first"
    });
  }
}

// Check if user is authorized
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "You are not authorized to do that"
        });
      }
    });
  } catch(err) {
    return next({
      status: 401,
      message: "You are not authorized to do that"
    })
  }
}