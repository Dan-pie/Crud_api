const { register, login } = require("../services/auth.services");

exports.signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const result = await register(email, password, username);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
    console.log(err.message);
  }
};
