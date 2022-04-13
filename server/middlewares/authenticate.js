const jwt = require('jsonwebtoken');
const color = require('colors');
const User = require('../models/User');

async function authenticate(req, res, next) {
  try {
    const token = req.headers['authorization'];
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.userId;
    const loginType = await User.findById({ _id: req.userId }).select(
      '-password -__v -createdAt -updatedAt'
    );
    req.loginType = loginType.loginType;

    console.log(`${req.loginType}`.green);
    next();
  } catch (err) {
    console.log(err.message);
    return res.json({ message: 'Acceess Denied' });
  }
}

module.exports = authenticate;
