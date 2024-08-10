
import User from '../models/User.js';

//Rota Privada
//memsa coisa que .get("/user/:id",checkToken
export const getUserId = async (req,res)=>{
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
  }
  