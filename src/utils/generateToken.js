const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
