const { z } = require("zod");

exports.updateSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(8, "Password deve conter no mínimo 8 caracteres.").optional(),
});
