// Server Middleware
const bcrypt = require("bcryptjs");
const { generateToken, authenticate } = require("../config");
const db = require("../models/userModel");

const hashPass = (req, res, next) => {
  let user = req.body;
  if (!user.password) {
    res.status(400).json("Password Required");
  }
  if (user.password.length < 8) {
    res.status(400).json("Password must be at least 8 characters long");
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    next();
  }
};

async function protectedRoute(req, res, next) {
  const token = await authenticate(req.headers.token);
  if (!token) {
    return res.status(401).json("No token provided. Please authenticate");
  } else {
    next();
  }
}

async function auth(req, res, next) {
  try {
    const body = req.body;
    const user = await db.getUserName(body.username);
    if (!user) {
      res.status(404).json({ message: "Enter a valid username and password!" });
    }
    if (user && bcrypt.compareSync(body.password, user.password)) {
      const token = await generateToken(user.id);
      const decodedToken = await authenticate(token);
      req.token = token;
      req.decoded = decodedToken.id;
      next();
    } else {
      res.status(404).json({ message: "Invalid username or password!" });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
}

module.exports = {
  hashPass,
  protectedRoute,
  auth
};
