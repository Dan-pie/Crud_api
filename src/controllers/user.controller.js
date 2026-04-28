const {
  updateUser,
  deleteUser,
  profileUser,
} = require("../services/user.services");

exports.profile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await profileUser(id);

    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { username, password } = req.body;

    const result = await updateUser(id, username, password);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await deleteUser(id);
    res.json(result);
  } catch (err) {
    next(err)
  }
};
