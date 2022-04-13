const mongoose = require('mongoose');
const user = new mongoose.Schema(
  {
    name: {
      type: 'String',
      required: true,
    },
    email: {
      type: 'String',
      required: true,
      unique: true,
    },
    password: {
      type: 'String',
      required: true,
    },
    address: {
      type: 'String',
    },
    role: {
      type: 'String',
      required: true,
    },
    phoneNo: 'Number',
    verified: {
      type: 'Boolean',
      default: false,
    },
    loginType: {
      required: true,
      type: 'Number', // 1. Admin 2. Employee >> for admin you want to set loginType = 1, manually on your mongodb database
    },
  },
  { timestamps: true }
);

const User = mongoose.model('user', user);

module.exports = User;
