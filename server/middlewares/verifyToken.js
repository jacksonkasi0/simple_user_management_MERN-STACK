const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
  try {
    var token = req.headers['authorization'];
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    if (data !== undefined) {
      const user = await User.findById(data.userId);
      if (user.verified) {
        return res.json({ message: 'Account has been verified already' });
      } else {
        req.userId = data.userId;
        next();
      }
    } else {
      res.json({ message: 'Access Denied' }).status(400);
    }
  } catch (error) {
    console.log(error.message);
    res.json({ message: 'Access Denied' }).status(400);
  }
}

module.exports = verifyToken;
