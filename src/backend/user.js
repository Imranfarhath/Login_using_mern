const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  logintime:Date,
  logouttime:Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
