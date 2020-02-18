// Todo:
// figure out how to group Daily nutritional count, Daily nutritional target and Daily food list based on calendar day
// also figure out how to index these items based on it
// Side Note: currently the best way appears to be just nesting the above in the user document because it's simply a one to one relationship


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
  // Weight data point
  weightData: [{
    weight: Number,
    date: Date
  }],
  // Daily nutritional count
  dailyNutritionCount: [{
    calories: Number,
    carbohydrate: Number,
    protein: Number,
    fat: Number,
    date: {
      type: Date,
      default: Date.now
    },
  }],
  // Daily nutritional target
  dailyNutritionTarget: [{
    calories: Number,
    carbohydrate: Number,
    protein: Number,
    fat: Number,
    date: {
      type: Date,
      default: Date.now
    },
  }],
  // Daily food list
  dailyFoodList: [{
    name: String,
    brandOwner: String,
    // from USDA database
    servingSize: Number,
    servingSizeUnit: String,
    // actual size of serving, a ratio of servingSize
    servingSizeRatio: Number,
    calories: Number,
    carbohydrate: Number,
    fat: Number,
    protein: Number,
    date: {
      type: Date,
      default: Date.now
    },
    meal: String
  }],
  
  // A cache for frequent foods.
  // Not implemented yet.
  frequentFoodList: [{
    name: String,
    brandOwner: String,
    servingSize: Number,
    servingSizeUnit: String,
    calories: Number,
    carbohydrate: Number,
    fat: Number,
    protein: Number
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

const egg={name: "RUDOLPH'S, SOUTHERN RECIPE, PORK RINDS",brandOwner: 'Rudolph Foods Company, Inc.',servingSize: 14,servingSizeUnit: 'g',calories: 79.94,carbohydrates: 0,fat: 4.9994,protein: 9.0006}