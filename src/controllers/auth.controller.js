const { register, login, refresh } = require("../services/auth.services");

exports.signUp = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const result = await register(email, password, username);
    res.status(201).json(result);
  } catch (err) {
    next(err)
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);

    res.json(result);
  } catch (err) {
    next(err)
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    const result = await refresh(token);
    
    res.json(result)
  } catch (err){
    next(err)
  }
};
