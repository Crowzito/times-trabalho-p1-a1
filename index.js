const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("----------# LOG DE REQUISIÇÃO #----------");
  console.log("TIME: ", new Date().toLocaleString());
  console.log("METODO: ", req.method);
  console.log(("ROTA: ", req.route));
});

const Campeonatos = require("./routes/campeonatos");
const Jogadores = require("./routes/jogadores");
const Partidas = require("./routes/partidas");
const Tecnicos = require("./routes/tecnicos");
const { timesRouter } = require("./routes/times");

app.use(Campeonatos);
app.use(Jogadores);
app.use(Partidas);
app.use(Tecnicos);
app.use(timesRouter);

app.listen(3000, () => {
  console.log("Server running on port: http://localhost:3000");
});
