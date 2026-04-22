const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out" });
};

// ✅ NEW — CHECK AUTH (VERY IMPORTANT)
const getMe = (req, res) => {
  res.json({
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe, // ✅ ADD THIS
};