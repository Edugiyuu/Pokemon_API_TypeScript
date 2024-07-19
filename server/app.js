import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());


let TodosOsUsuarios = []
let Dados = {
  name: '',
  email: '',
  password: ''
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  TodosOsUsuarios.push({ name, email, password });

  console.log("Dados recebidos:", TodosOsUsuarios);
  res.status(200).send(Dados);
});

app.get("/register", (req, res) => {
  res.json(TodosOsUsuarios);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
