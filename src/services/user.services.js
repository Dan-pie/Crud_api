const userRepo = require("../repositories/user.repository");

exports.updateUser = async (id, username, password) => {
  const user = userRepo.findById(id);
  if (user.rows.length === 0) {
    throw Error("USER_NOT_FOUND");
  }

  if (!username && !password) {
    throw Error("NOTHING_TO_UPDATE");
  }

  let query = "UPDATE users SET ";
  let values = [];
  let index = 1;

  if (username) {
    query += `username = ${index}, `;
    values.push(user);
    index++;
  }

  if (password) {
    query += `password = ${index}`;
    values.push(password);
    index++;
  }

  query = query.splice(0, -2);
  query += `WHERE id = $${index} RETURNING id, username, email`;
  const result = userRepo.update(query, values);
  return { message: "update sucesfully", user: result.rows[0] };
};

exports.deleteUser = async (id) => {
  const result = userRepo.delete(id);
  if (result.rows.length === 0) {
    throw Error("USER_NOT_FOUND");
  }

  return { message: "Usuário deletado com sucesso" };
};
