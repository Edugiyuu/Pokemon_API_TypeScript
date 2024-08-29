import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Prof from '../Imgs/Caracters/Prof.png'
import Child from '../Imgs/Caracters/Child.png'
import ProfAndChild from '../Imgs/Caracters/Prof&Child.png'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import useOpenClose from '../Hooks/useOpenClose';

import '../Styles/Register.css'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmRegister, changeBoolean] = useOpenClose(false);

  const handleRegister = async () => {
    try {
      if (name === '' || email === '' || password === '') {
        changeBoolean();
        return;
      }

      const response = await axios.post('http://localhost:3000/auth/register', {
        name,
        email,
        password,
      });

      console.log(response.data);
      changeBoolean();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Register">
      <Snackbar
        open={confirmRegister}
        autoHideDuration={5000}
        onClose={changeBoolean}
        message="Cadastrado!"
      />
      <img className="Char" src={Prof} alt="" />
      <img className="Char2" src={ProfAndChild} alt="" />
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
          <Avatar id="AvatarIcon" sx={{ m: 0.5, bgcolor: "primary.light" }}>
            <h2>R</h2>
          </Avatar>
          <Typography variant="h4">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Já fez seu cadastro? Clique aqui</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <img className="Char" src={Child} alt="" />
    </div>
  );
};

export default Register;
