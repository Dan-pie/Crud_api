require("dotenv").config();

const express = require("express");
const app = express();
const errorMiddleware = require("./src/middlewares/error.middleware");

app.use(express.json());

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes")

app.use("/users", userRoutes);
app.use("/", authRoutes)

const PORT = process.env.PORT || 3000;

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
