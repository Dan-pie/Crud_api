const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const users = [];
const db = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido");
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id},
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
}

exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos tem que estar preenchidos" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *",
      [email, username, newPassword],
    );

    const newUser = result.rows[0];

    const token = generateToken(newUser);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, password } = req.body;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!username && !password) {
      return res.status(400).json({ error: "Nada para atualizar" });
    }

    let query = "UPDATE users SET ";
    let values = [];
    let index = 1;

    if (username) {
      query += `username = $${index}, `;
      values.push(username);
      index++;
    }

    if (password) {
      const hash = await bcrypt.hash(password, 10);
      query += `password = $${index}`;
      values.push(hash);
      index++;
    }

    query = query.slice(0, -2);

    query += ` WHERE id = $${index} RETURNING id, username, email`;
    values.push(id);

    const result = await db.query(query, values);

    res.json({
      message: "Atualizado com sucesso",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Campos inválidos" });
    }

    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(401).json({ error: "Email ou senha inválidos." });

    const token = generateToken(user);

    res.json({ message: "Logado com sucesso.", token });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
