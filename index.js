require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");

app.use('/users', userRoutes)

const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
