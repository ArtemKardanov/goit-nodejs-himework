exports.getCurrentUser = (req, res) => {
  try {
    if (!req.user) {
      req.status(401).json({ message: "Not authorized" });
      return;
    }
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    console.log(error);
  }
};
