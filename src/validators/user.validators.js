const { z } = require("zod");

exports.updateSchema = z.object({
  username: z.string().min(3, 'Username deve conter no mínimo 3 caracteres.').optional(),
  password: z.string().min(8, "Password deve conter no mínimo 8 caracteres.").optional(),
});


exports.changeRoleSchema = z.object({
  id: z.uuid("Id inválido"),
  role: z.enum(["admin", "user"])
})