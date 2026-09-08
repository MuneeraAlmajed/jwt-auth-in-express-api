const User = require("../models/user");
const bcrypt = require('bcrypt');
const SALT_ROUDS = 10;
const jwt = require('jsonwebtoken')


const signup = async (req, res) => {
  try {
    // Verify if the username already exists
    const userInDatabase = await User.findOne({
      username: req.body.username
    });

    // If the user exists, send error message
    if (userInDatabase) {
      return res.status(409).json({ err: 'Invalid input' });
    }

    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUDS);
    req.body.password = hashedPassword;

    // Create the new user
    const user = await User.create(req.body);

    const payload = {
      username: user.username,
      _id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({ user, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
    signup, 
}