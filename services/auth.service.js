const jwt = require("jsonwebtoken");

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.PRIVATE_KEY);
};

module.exports = {
  createToken,
};
