const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const authenticate = require('../../../middlewares/authenticate');
const permit = require('../../../middlewares/permit');
const verifyToken = require('../../../middlewares/verifyToken');

router.get('/', (req, res) => {
  res.send('user router activated');
});

router.post('/signup', [authenticate, permit([1])], async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.name ||
    !req.body.role
  ) {
    return res
      .json({
        message: 'Please fill all the fields',
      })
      .status(400);
  }

  const isUser = await User.findOne({ email: req.body.email });
  if (isUser) {
    return res
      .json({
        message: 'User already exists',
      })
      .status(400);
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    req.body.loginType = 2;
    const user = new User(req.body);
    await user.save();
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let info = transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Verification E-mail',
      html: `<h1>Welcome to the app</h1>
      <p>Please click on the link below to verify your email</p>
      <a href="http://localhost:3000/verify/${token}">Verify</a>`,
    });

    if (info) {
      console.log(info);
    }
    res.json({
      message: 'Account created successfully. Please verify your email',
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Somthing went wrong' }).status(500);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: 'User not found' }).status(400);
    }
    if (!user.verified) {
      return res.json({ message: 'Please verify your email' }).status(400);
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Invalid credentials' }).status(400);
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Somthing went wrong' }).status(500);
  }
});

router.get('/userData', [authenticate, permit([1])], async (req, res) => {
  try {
    const users = await User.find({}).select(
      '-createdAt -__v -updatedAt -password'
    );
    res.json({ success: true, users }).status(200);
  } catch (err) {
    res.json({ message: err.message }).status(500);
  }
});

router.get('/get/data', authenticate, async (req, res) => {
  try {
    const user =   await User.findById({ _id: req.userId }).select(
      '-password -__v -createdAt -updatedAt'
    );
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.get('/verification', verifyToken, async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id: req.userId },
      { verified: true }
    );
    if (data) {
      res.json({ success: true, message: 'Account verified successfully' });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
