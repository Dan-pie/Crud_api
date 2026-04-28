const db = require("../config/db");

exports.addToken = (token, user_id) => {
  return db.query(
    "INSERT INTO refresh_tokens (token, user_id) VALUES ($1, $2) RETURNING *;",
    [token, user_id],
  );
};

exports.findToken = (token) => {
  return db.query("SELECT * FROM refresh_tokens WHERE token = $1", [token]);
};

exports.invalidateToken = (token) => {
  return db.query(
    "UPDATE refresh_tokens SET is_valid = false WHERE token = $1",
    [token],
  );
};
