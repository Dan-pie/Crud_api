const { register, login } = require("../services/auth.services");

exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Todos os campos tem que estar preenchidos" });
    }
    const result = register(email, password, username);
    res.status(201).json(result);
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

    const result = login(email, password);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
