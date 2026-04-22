const { z } = require('zod')

exports.registerSchema = z.object({
    email: z.string().email("Email inválido"),
    username: z.string().min(3, 'Username deve conter no mínimo 3 caracteres.'),
    password: z.string().min(8, 'Password deve conter no mínimo 8 caracteres.')
})

exports.loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(8, 'Password deve conter no mínimo 8 caracteres.')
})