const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

function canManageUser(requestUser, targetId) {
  return requestUser.role === "admin" || requestUser.id === targetId;
}

exports.profileUser = async (requestUser, targetId) => {
  if (!canManageUser(requestUser, targetId)) {
    throw new Error("FORBIDDEN");
  }

  const result = await userRepo.findById(targetId);

  if (result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = result.rows[0];
  return { id: user.id, email: user.email, username: user.username, role: user.role };
};

exports.updateUser = async (requestUser, targetId, username, password) => {
  if (!canManageUser(requestUser, targetId)) {
    throw new Error("FORBIDDEN");
  }
  const user = await userRepo.findById(targetId);
  if (user.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!username && !password) {
    throw new Error("NOTHING_TO_UPDATE");
  }

  let newPassword;
  let query = "UPDATE users SET ";
  let values = [];
  let index = 1;

  if (username) {
    query += `username = $${index}, `;
    values.push(username);
    index++;
  }

  if (password) {
    newPassword = await bcrypt.hash(password, 10);
    query += `password = $${index}, `;
    values.push(newPassword);
    index++;
  }

  query = query.slice(0, -2);
  query += ` WHERE id = $${index} RETURNING id, username, email;`;
  values.push(targetId);
  const result = await userRepo.update(query, values);
  return { message: "update sucesfully", user: result.rows[0] };
};

exports.deleteUser = async (requestUser, targetId) => {
  if (!canManageUser(requestUser, targetId)) {
    throw new Error("FORBIDDEN");
  }

  const result = await userRepo.delete(targetId);
  if (result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }


  return { message: "Usuário deletado com sucesso", id: result.rows[0].id };
};

exports.findAll = async (requestUser) => {
  if (requestUser.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  const result = await userRepo.seeAllProfiles();

  return result.rows;
};

exports.changeRole = async (requestUser, id, role) => {
  if (requestUser.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  const result = await userRepo.changeRole(role, id);

  return result.rows[0];
};
