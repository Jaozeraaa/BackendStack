import express from 'express';
import cors from 'cors';
import rotaTelefone from './Rotas/rotaTelefone.js';
import rotaHospede from './Rotas/rotaHospede.js';
import rotaVaga from './Rotas/rotaVaga.js';

const app = new express();

app.use(cors({origin:"*"}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/hospede", rotaHospede);
app.use("/telefone", rotaTelefone);
app.use("/vaga", rotaVaga);


app.listen(3020, "localhost", () => {
  console.log("Escutando na porta 3020");
});

