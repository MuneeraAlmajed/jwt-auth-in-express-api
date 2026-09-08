const jwt = require("jsonwebtoken");

const signToken = (req, res) => {
  const user = {
    _id: 1,
    username: "test",
    password: "test",
  };

  const token = jwt.sign(
    {
      username: user.username,
      _id: user._id,
    },

    process.env.JWT_SECRET,
  );

  res.json({
    message: "You are authorized!",
    token,
  });
};

const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ message: 'Tooken is valid', token: decoded });
  } catch (err) {
    res.status(401).json({ err: "Invalid token." });
  }
};

module.exports = {
  signToken,
  verifyToken,
};
