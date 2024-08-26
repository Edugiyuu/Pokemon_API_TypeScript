import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
  } from "@mui/material";
  import { useState } from "react";
  import Hilda from '../Imgs/Caracters/Hilda.png'
  import CoolGuy from '../Imgs/Caracters/CoolGuy.png'
  import GreenAndCynthia from '../Imgs/Caracters/Green&Cynthia.png'
  import axios from "axios";
  import '../Styles/Login.css'
  
  const ForgotPassWord = () => {
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
     
          console.log('Login', response.data);
      
          await axios.post('http://localhost:3000/send-email', {
            to: email,
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
            <Typography variant="h5">Esqueceu sua senha?</Typography>
            <Box sx={{ mt: 1 }}>
        
         
              <TextField
                margin="normal"
                required
                fullWidth
                focused
                id="password"
                label="Email"
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
                Mandar Codigo de verificação
              </Button>
              
              
            </Box>
          </Box>
        </Container>
        <img className="Char" src={CoolGuy} alt="" />
      </div>
    );
  };
  
  export default ForgotPassWord;