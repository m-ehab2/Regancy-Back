const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    tirm: true,
    lowercase: true
},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum:['user','admin',],
    default: "user",
  },
  isEmailVerified: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
      type: Boolean,
      default: false
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
