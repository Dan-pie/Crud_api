const {
  updateUser,
  deleteUser,
  profileUser,
  changeRole,
  findAll
} = require("../services/user.services");

exports.profile = async (req, res, next) => {
  try {
    const user = req.user;
    const targetId = req.params.id || user.id
    const result = await profileUser(user, targetId);

    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id
    const { username, password } = req.body;
    console.log(username, password)
    const requestUser = req.user
    const result = await updateUser(requestUser, id, username, password);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.delete = async (req, res, next) => {
  try {
    const user = req.user
    const id = req.params.id || user.id
    const result = await deleteUser(user, id);
    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.findAll = async (req, res, next) => {
  try{
    const user = req.user
    const result = await findAll(user)
    res.json(result)
  }catch(err){
    next(err)
  }
}

exports.changeRole = async (req, res, next) => {
  try {
    const user = req.user
    const {id} = req.params
    const {role} = req.body
    const result = await changeRole(user, id, role)
    res.json(result)
  } catch (err) {
    next(err)
  }
}
