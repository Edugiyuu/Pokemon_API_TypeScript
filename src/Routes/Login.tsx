import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
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
          <Avatar id='AvatarIcon' sx={{ m: 1, bgcolor: "primary.light" }}>
            <h2>L</h2>
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="senha"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Não tem uma Conta? Clique aqui</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <img className="Char" src={CoolGuy} alt="" />
    </div>
  );
};

export default Login;