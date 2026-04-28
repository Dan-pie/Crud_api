const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const userRepos = require("../repositories/user.repository");
const tokensRepos = require("../repositories/tokens.repository");

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

exports.register = async (email, password, username) => {
  const userExisting = await userRepos.findByEmail(email);
  if (userExisting.rows.length > 0) {
    throw new Error("USER_EXISTS");
  }

  const newPassword = await bcrypt.hash(password, 10);
  const result = await userRepos.create(email, newPassword, username);
  const user = result.rows[0];
  const token = await generateToken(user);

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

  const token = await generateToken(user);

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

exports.refresh = async (token) => {
  const payload = jwt.verify(token, JWT_REFRESH_SECRET);

  if (payload.type !== "refresh") {
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  const tokenDb = await tokensRepos.findToken(token);

  if (tokenDb.rows.length === 0) {
    throw new Error("INVALID_REFRESH_TOKEN,");
  }
  const tokenData = tokenDb.rows[0];

  if (!tokenData.is_valid) {
    throw new Error("TOKEN_INVALID");
  }

  await tokensRepos.invalidateToken(token);

  const userResult = await userRepos.findById(payload.id);

  if (userResult.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = userResult.rows[0];

  return await generateToken(user);
};
