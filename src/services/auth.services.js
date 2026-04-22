const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const userRepos = require("../repositories/user.repository");

exports.register = async (email, password, username) => {
  const userExisting = await userRepos.findByEmail(email);
  if (userExisting.rows.length > 0) {
    throw new Error("USER_EXISTS");
  }

  const newPassword = await bcrypt.hash(password, 10);
  const result = await userRepos.create(email, newPassword, username);
  const user = result.rows[0];
  const token = generateToken(user);

  return {
    message: "Usuário criado com sucesso!",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
};

exports.login = async (email, password) => {
  const userExisting = await userRepos.findByEmail(email);
  if (userExisting.rows.length === 0) {
    throw new Error("USER_OR_PASSWORD_WRONG");
  }

  const user = userExisting.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("USER_OR_PASSWORD_WRONG");
  }

  const token = generateToken(user);

  return {
    message: "Logado com sucesso.",
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  };
};
