const {
  updateUser,
  deleteUser,
  profileUser,
} = require("../services/user.services");

exports.profile = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await profileUser(id);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
    console.log(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.user.id;
    const { username, password } = req.body;

    const result = await updateUser(id, username, password);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.user.id;
    const result = await deleteUser(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
