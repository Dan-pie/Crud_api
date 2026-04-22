const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

exports.profileUser = async (id) => {
  const result = await userRepo.findById(id);
  if (!result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }
  const user = result.rows[0];
  return { id: user.id, email: user.email, username: user.username };
};

exports.updateUser = async (id, username, password) => {
  const user = await userRepo.findById(id);
  if (user.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!username && !password) {
    throw new Error("NOTHING_TO_UPDATE");
  }

  const newPassword = await bcrypt.hash(password, 10);
  let query = "UPDATE users SET ";
  let values = [];
  let index = 1;

  if (username) {
    query += `username = $${index}, `;
    values.push(username);
    index++;
  }

  if (password) {
    query += `password = $${index}, `;
    values.push(newPassword);
    index++;
  }

  query = query.slice(0, -2);
  query += ` WHERE id = $${index} RETURNING id, username, email;`;
  values.push(id);
  console.log(query, values);
  const result = await userRepo.update(query, values);
  return { message: "update sucesfully", user: result.rows[0] };
};

exports.deleteUser = async (id) => {
  const result = await userRepo.delete(id);
  if (result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  return { message: "Usuário deletado com sucesso" };
};
