const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "bacon";

function generateToken(user) {
  const payload = {
    userID: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "12h"
  };

  return jwt.sign({ userID: user.id }, secret, payload);
}

function authenticate(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    console.log(decoded);
    return decoded;
  });
}

module.exports = {
  generateToken,
  authenticate
};
