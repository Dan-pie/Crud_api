const jwt = require("jsonwebtoken");
const tokensRepo = require("../repositories/tokens.repository");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

module.exports = async (user) => {
  try {
    const acessToken = jwt.sign({ id: user.id, type: "acess" }, JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user.id, type: "refresh" },
      JWT_REFRESH_SECRET,
      {
        expiresIn: "5h",
      },
    );

    await tokensRepo.addToken(refreshToken, user.id);

    return { acessToken, refreshToken };
  } catch (err) {
    throw new Error("TOKEN_GENERATION_ERROR");
  }
};
