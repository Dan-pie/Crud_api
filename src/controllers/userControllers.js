const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const users = [];
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido");
}

function generateToken(user){
  return jwt.sign({ id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },)
}

exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos tem que estar preenchidos" });
    }
    const existingUser = users.find((u) => u.email === email);
    if (existingUser)
      return res.status(400).json({ error: "Usuário já cadastrado" });

    const newPassword = await bcrypt.hash(password, 10);

    const user = { id: v4(), email, username, password: newPassword };
    users.push(user);

    const token = generateToken(user);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
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

    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (!username && !password) {
      return res.status(400).json({ error: "Nada para atualizar" });
    }

    if (username) user.username = username;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    res.json({
      message: "Atualizado com sucesso",
      user: {
        id: user.id,
        username: user.username,
      },
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

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(401).json({ error: "Email ou senha inválidos." });

    const token = generateToken(user);

    res.json({ message: "Logado com sucesso.", token });
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.delete = (req, res) => {
  const id = req.user.id;
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.splice(index, 1);
  res.json({ message: "Usuário deletado com sucesso" });
};
