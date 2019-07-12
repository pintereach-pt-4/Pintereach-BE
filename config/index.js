const jwt = require("jsonwebtoken");

const secret = process.env.SECRET || "bacon";

function generateToken(user) {
  const payload = {
    id: user
  };
  const options = {
    expiresIn: "12h"
  };

  return jwt.sign(payload, secret, options);
}

function authenticate(token) {
  return jwt.verify(token, secret, (err, decoded) => {
    return decoded;
  });
}

module.exports = {
  generateToken,
  authenticate
};
