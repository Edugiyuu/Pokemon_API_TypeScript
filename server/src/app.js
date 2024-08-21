import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import nodemailer from 'nodemailer'
import routes from "./routes/routes.js"
import cors from 'cors';

dotenv.config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('SECRET', process.env.SECRET);

const app = express();
app.use(routes)


//app.use(nodemailerRoutes)

//só por vias das duvidas..
app.use(express.json());
//-----------------
//Rota publica
app.use(cors());

//ATENÇÃO EDU
// aqui o nodeMailer funciona normalmente
// mas criando o controller e routes ele simplismente não funciona
// da um erro chamado Error: Missing credentials for "PLAIN"
// só que não faz sentido
/* const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: 'E-mail enviado!', info });
  });
});
 */


app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const gmail = process.env.GMAIL_USER
console.log(gmail);

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
