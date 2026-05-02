const { ZodError } = require("zod");

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues.map((e) => e.message) });
  }

  if (err.message === "USER_NOT_FOUND") {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (err.message === "USER_OR_PASSWORD_WRONG") {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  if (err.message === "USER_EXISTS") {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  if (err.message === "INVALID_REFRESH_TOKEN"){
    return res.status(401).json({error: "Token inválido"})
  }

  if (err.message === "NOTHING_TO_UPDATE"){
    return res.status(400).json({error: "Nada para atualizar"})
  }

  if (err.message === "UNAUTHORIZED"){
    return res.status(401).json({error: "Não autorizado"})
  }
  res.status(500).json({ error: "Erro interno do servidor", errorMessage: err.message });
};
