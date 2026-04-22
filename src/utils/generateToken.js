const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (user) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
