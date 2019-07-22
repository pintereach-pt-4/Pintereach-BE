// Server Middleware
const bcrypt = require("bcryptjs");
const { generateToken, authenticate } = require("../config");
const db = require("../models/userModel");

// takes in a user and pulls the users password
// if no password provided returns 'password required'
//  hash's user password and salts 2^12

const hashPass = (req, res, next) => {
  let user = req.body;
  if (!user.password) {
    res.status(400).json("Password Required");
  }
  if (user.password.length < 8) {
    res.status(400).json("Password must be at least 8 characters long");
  } else {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    next();
  }
};

async function protectedRoute(req, res, next) {
  try {
    // looks for a users token
    const token = await authenticate(req.headers.token);
    // if no token returns a 401 error message
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided. Please authenticate" });
    } else {
      // if its found save it to be used later
      req.decoded = token;
      next();
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
}

async function auth(req, res, next) {
  try {
    const body = req.body;
    const user = await db.getUserName(body.username);
    // searches for a users name
    if (!user) {
      res.status(404).json({ message: "Enter a valid username and password!" });
    }
    if (user && bcrypt.compareSync(body.password, user.password)) {
      // compares given password with db's password counters timing attacks constant time algorithms

      const token = await generateToken(user);
      const decodedToken = await authenticate(token);
      req.token = token;
      req.decoded = decodedToken;
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
