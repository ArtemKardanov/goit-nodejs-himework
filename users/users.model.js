const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
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

  createUser = (user) => {
    return this.user.create(user);
  };
}

module.exports = {
  User: new User(),
};
