const db = require("../config/db");

exports.findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email]);
};

exports.findById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1", [id]);
};

exports.create = (email, password, username) => {
  return db.query(
    "INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *",
    [email, password, username],
  );
};

exports.delete = (id) => {
  return db.query("DELETE FROM users WHERE id = $1 RETURNING id", [id]);
};

exports.update = (query, value) => {
  return db.query(query, value);
};

exports.changeRole = (role, id) => {
  return db.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING username, role;", [role, id])
}

exports.seeAllProfiles = () => {
  return db.query("SELECT id, email, username, role FROM users;")
}