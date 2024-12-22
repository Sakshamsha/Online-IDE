const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    password: String,
    date:{
      type: Date,
      default: Date.now
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  });
  
  module.exports = mongoose.model('User', userSchema);