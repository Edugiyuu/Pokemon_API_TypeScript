import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from './models/User.js';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'
import favorites from './routes/favorites.js'
import cors from 'cors';

dotenv.config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('SECRET', process.env.SECRET);

const app = express();
app.use(favorites);

//só por vias das duvidas..
app.use(express.json());
//-----------------
//Rota publica
app.use(cors());
const transporter = nodemailer.createTransport({
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
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

//Rota Privada
app.get("/user/:id",checkToken,async(req,res)=>{
  const id = req.params.id
  //check if user exists
  //pega o id do usuario, e pega os dados menos a senha
  const user = await User.findById(id,'-password')
  //verifica se o usuario não existe
  if (!user) {
    return res.status(404).json({msg:'Usuario não encontrado'})
  }
  //retorna os dados do user
  res.status(200).json({user})
})

export function checkToken(req, res, next) {
  //verifica se tem autorização
 
  //se o 'authorization' não existir no metodo get,post etc.. O authHeader vai ser undefined
  //mas se existir vai ser "Bearer fj10e28d123dj"(o token)
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  //só não entendi pq aparece 2 tokens
  //e aqui ele divide o Bearer e o token deixando eles separados e pegando só o token na posição 1
  const token = authHeader.split(" ")[1];
  /* const token = authHeader && authHeader.split(" ")[1]; */
//verifica se o token é valido
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado.' });
  }
  
  try {
    const secret = process.env.SECRET;
    //verifica se o token é valido e assinado com o secret
    const decoded = jwt.verify(token, secret);
    
    // armazena os dados decodificados na requisição
    req.token = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token inválido'});
  }
}


app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  //validação
  //se não ter nome..
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatorio' });
  }
  //se não ter email..
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatorio' });
  }
  //se não ter senha..
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatorio' });
  }
  //verifica se o email que o usuario colocou já existe
  const userExists = await User.findOne({email:email})
  //se o email do usuario já existe
  if(userExists){
    return res.status(422).json({ msg: 'Use outro email' });
  }
 
  //quanto maior o valor do genSalt mais tempo ele leva mas ele é mais seguro
  const salt = await bcrypt.genSalt(12)
  //se eu não passar o salt aqui ele vai gerar um salt aleatorio
  const passwordHash = await bcrypt.hash(password,salt)

  const user = new User({
    name,
    email,
    password:passwordHash,
    //name = nome do usuario
    //email = email do usuario
    //password = senha do usuario + salt (valor aleatorio) + criptocrafado junto
  })
  try{
    await user.save()
    res.status(201).json({msg: 'usuario criado'})
    
  } catch(error){
    res.status(500).json({msg:'erro no servidor'})
  }
});

//Login user
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Validação
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório' });
  }
  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória' });
  }
  
  // Checar se o usuário existe
  const user = await User.findOne({ email: email });
  
  if (!user) {
    return res.status(422).json({ msg: 'Usuário não encontrado' });
  }
  
  // Checar se a senha é igual ao que o usuario passou
  const checkPassword = bcrypt.compare(password, user.password);
  //se for igual
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' });
  }
  
  try {
    //pega o secret em .env
    const secret = process.env.SECRET;
    //o token ficaria tipo assim https://jwt.io/
    const token = jwt.sign(
      //aqui seria o PAYLOAD
      { id: user._id },
      //e aqui seria VERIFY SIGNATURE
      secret
    );
    
    res.status(200).json({
      msg: 'Autenticação feita com sucesso',
      token,
      id: user._id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Algum erro ocorreu' });
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
