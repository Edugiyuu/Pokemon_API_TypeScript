import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const postRegister = async (req, res) => {
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
  const userExists = await User.findOne({ email: email })
  //se o email do usuario já existe
  if (userExists) {
    return res.status(422).json({ msg: 'Use outro email' });
  }

  //quanto maior o valor do genSalt mais tempo ele leva mas ele é mais seguro
  const salt = await bcrypt.genSalt(12)
  //se eu não passar o salt aqui ele vai gerar um salt aleatorio
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: passwordHash,
    //name = nome do usuario
    //email = email do usuario
    //password = senha do usuario + salt (valor aleatorio) + criptocrafado junto
  })
  try {
    await user.save()
    res.status(201).json({ msg: 'usuario criado' })

  } catch (error) {
    res.status(500).json({ msg: 'erro no servidor' })
  }
};

//Login user
export const postLogin = async  (req, res) => {
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
  const checkPassword = await bcrypt.compare(password, user.password);

  //se não for igual
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
    //retorna o token e o id do usuario
    res.status(200).json({
      msg: 'Autenticação feita com sucesso',
      token,
      id: user._id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Algum erro ocorreu' });
  }
};
