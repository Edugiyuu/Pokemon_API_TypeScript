import jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
  //verifica se tem autorização
 
  //se o 'authorization' não existir no metodo get,post etc.. O authHeader vai ser undefined
  //mas se existir vai ser "Bearer fj10e28d123dj"(o token)
  const authHeader = req.headers['authorization'];
  /* console.log(authHeader); */
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