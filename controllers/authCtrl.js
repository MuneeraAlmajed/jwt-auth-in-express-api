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

const login = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      username: req.body.username
    });

    // Only allow users that exist to login
    if (!userInDatabase) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // Make sure the password matches
    if (!bcrypt.compareSync(req.body.password, userInDatabase.password)) {
      return res.status(401).json({ err: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
    signup, login,
}