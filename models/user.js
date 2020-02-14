const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Weight data is an array of objects that have a weight and date fiel
  weightData: [{
    weight: {
      type: Number,
    },
    date: {
      type: Date
    }
  }]
});

// If password is modified, hash pasword
userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')){
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare input password to stored password hash
userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;