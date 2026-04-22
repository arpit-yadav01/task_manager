const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,       // 🔥 required for HTTPS (Vercel/Render)
    sameSite: "None",   // 🔥 required for cross-origin
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;