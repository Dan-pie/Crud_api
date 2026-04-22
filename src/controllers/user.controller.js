const { updateUser, deleteUser } = require("../services/user.services");

exports.update = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, password } = req.body;

    const result = updateUser(id, username, password);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.user.id;
    const result = deleteUser(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
