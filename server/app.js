import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Carrega as variáveis de ambiente
dotenv.config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);

const app = express();

//só por vias das duvidas..
app.use(express.json());
//-----------------

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatorio' });
  }

});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.becmbol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('Conectou ao banco!');
    app.listen(3000, () => {
      console.log('Servidor está rodando na porta 3000!');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
  });
