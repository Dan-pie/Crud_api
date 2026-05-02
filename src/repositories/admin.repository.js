const db = require("../config/db")

exports.seeAllProfiles = () => {
    return db.query("SELECT id, email, username, role FROM users;")
}
