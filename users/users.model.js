const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
});

class User {
  constructor() {
    this.user = mongoose.model("User", userSchema);
  }

  getUsers = (query) => {
    return this.user.find(query, { password: false });
  };

  getUserByid = (id) => {
    return this.user.findById(id);
  };

  updateToken = (id, token) => {
    return this.user.findByIdAndUpdate(id, { token });
  };

  createUser = (user) => {
    return this.user.create(user);
  };

  getUserByEmail = (email) => {
    return this.user.findOne({ email });
  };
}

module.exports = new User();
