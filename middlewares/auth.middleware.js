const jwt = require("jsonwebtoken");

const tokenMiddleware = async (req, res) => {
  const { authorization: token } = req.headers;

  if (!token) {
    res.status(401).send("Not authorized");
    return;
  }

  try {
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = id;

    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};

module.exports = tokenMiddleware;
