import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hilda from '../Imgs/Caracters/Hilda.png'
import CoolGuy from '../Imgs/Caracters/CoolGuy.png'
import GreenAndCynthia from '../Imgs/Caracters/Green&Cynthia.png'
import axios from "axios";
import '../Styles/Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password
      });
      //se deu tudo certo..
      if (response.status === 200) {
   
        console.log('Login aprovado:', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);

        await axios.post('http://localhost:3000/send-email', {
          to: "edupaz077@gmail.com",
          subject: "Login",
          text: "Login feito",
          html: "<strong>Hello world?</strong>",
        });
        //não funciona
        /* await axios.post('http://localhost:3000/send-email', {
          to: {email},
          subject: "Login",
          text: "Login feito",
          html: "<strong>Hello world?</strong>",
        }); */
        console.log('email enviado');
      } else {
      
        console.log('Login recusado');
      }
    } catch (error) {
     
      console.error('Erro ao fazer login:', error);
    }
  };
  

  return (
    <div className="Login">   
      <img className="Char" src={Hilda} alt="" />
      <img className="Char2" src={GreenAndCynthia} alt="" />
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar id='AvatarIcon' sx={{ m: 1, bgcolor: "var(--cor-de-fundo)" }}>
            <h3>L</h3>
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              label="Email"
              color="info"
              type='email'
              focused
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              fullWidth
              sx={{
                '.MuiInputBase-input': {
                  color: 'var(--text-color)',
                  backgroundColor:'var(--background-color)' // Cor do texto dentro do input
                },  
              }}
            />
       
            <TextField
              margin="normal"
              required
              fullWidth
              focused
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              sx={{
                '.MuiInputBase-input': {
                  color: 'var(--text-color)',
                  backgroundColor:'var(--background-color)' // Cor do texto dentro do input
                },  
              }}
            />

            <Button
              className="LoginButton"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color:'var(--text-color)',
                backgroundColor: "var(--cor-de-fundo)",
                ":hover": {
                  backgroundColor: "rgb(243, 60, 60)", 
                }
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <div className="ForgotAndRegister">
              <Link className="RegisterButton" to="/register">Não tem uma Conta? Clique aqui</Link>
              <Link className="RegisterButton" to="/forgotPassWord">Esqueceu a senha? Clique aqui</Link>
            </div>
            
          </Box>
        </Box>
      </Container>
      <img className="Char" src={CoolGuy} alt="" />
    </div>
  );
};

export default Login;