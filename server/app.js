import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from './models/User.js';
import jwt from "jsonwebtoken";

// Carrega as variáveis de ambiente
import cors from 'cors';


dotenv.config();

console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('SECRET', process.env.SECRET);

const app = express();

//só por vias das duvidas..
app.use(express.json());
//-----------------
//Rota publica
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a API!" });
});

//Rota Privada
app.get("/user/:id",checkToken,async(req,res)=>{
  const id = req.params.id
  //check if user exists
  const user = await User.findById(id,'-password')

  if (!user) {
    return res.status(404).json({msg:'Usuario não encontrado'})
  }
  res.status(200).json({user})
})

function checkToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({msg:'acesso negado.'})
  }
  try{
    const secret = process.env.SECRET

    jwt.verify(token,secret)
    //permite que continue
    next()
  }catch(error){
    res.status(400).json({msg:'Token invalido'})
  }
}

app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  //validação
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatorio' });
  }
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatorio' });
  }
  if (!password) {
    return res.status(422).json({ msg: 'A password é obrigatorio' });
  }
  
  const userExists = await User.findOne({email:email})

  if(userExists){
    return res.status(422).json({ msg: 'Use outro email' });
  }
  const salt = await bcrypt.genSalt(12)

  const passwordHash = await bcrypt.hash(password,salt)

  const user = new User({
    name,
    email,
    password:passwordHash,
    /* se eu usar só password ele n fica com as letrinhas etc.. */
   /*  password */
  })
  try{
    await user.save()

    res.status(201).json({msg: 'usuario criado'})
    
  } catch(error){
    res.status(500).json({msg:'erro no servidor'})
  }
});

//Login user
app.post('/auth/login',async(req,res)=>{
  const {email, password} = req.body
  //validação
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatorio' });
  }
  if (!password) {
    return res.status(422).json({ msg: 'A password é obrigatorio' });
  }
  //Checar se o usuario existe
  const user = await User.findOne({email:email})
  
  if(!user){
    return res.status(422).json({ msg: 'Usuario não encontrado' });
  }
  //Checar se a senha é igual
  const checkPassword = await bcrypt.compare(password,user.password)

  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha invalida' });
  }
  try{
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
      id: user._id
    },
  secret
  )
  res.status(200).json({msg:'Autenticação feita com successo',token})
  } catch(err){
    console.log(err);
    res.status(500).json({
      msg:'algum erro aqui'
    })
  }
})

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
