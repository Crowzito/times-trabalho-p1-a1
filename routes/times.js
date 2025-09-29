const express = require("express");
const router = express.Router();

let times = []; 
let currentId = 1; 


router.post("/times", (req, res) => {
  const { nome, anoFundacao, cidadeSede, estadio, titulosImportantes } = req.body;

  
  if (!nome || !anoFundacao || !cidadeSede || !estadio) {
    return res.status(400).json({ error: "Campos obrigatórios estão faltando" });
  }

  const novoTime = {
    id: currentId++,
    nome,
    anoFundacao,
    cidadeSede,
    estadio,
    titulosImportantes: titulosImportantes || []
  };

  times.push(novoTime);
  res.status(201).json(novoTime);
});

router.get("/times", (req, res) => {
  res.json(times);
});

router.get("/times/:id", (req, res) => {
  const time = times.find(t => t.id === parseInt(req.params.id));
  if (!time) {
    return res.status(404).json({ error: "Time não encontrado" });
  }
  res.json(time);
});

router.put("/times/:id", (req, res) => {
  const { nome, anoFundacao, cidadeSede, estadio, titulosImportantes } = req.body;
  const time = times.find(t => t.id === parseInt(req.params.id));

  if (!time) {
    return res.status(404).json({ error: "Time não encontrado" });
  }

  if (nome) time.nome = nome;
  if (anoFundacao) time.anoFundacao = anoFundacao;
  if (cidadeSede) time.cidadeSede = cidadeSede;
  if (estadio) time.estadio = estadio;
  if (titulosImportantes) time.titulosImportantes = titulosImportantes;

  res.json(time);
});

router.delete("/times/:id", (req, res) => {
  const index = times.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Time não encontrado" });
  }

  const [removido] = times.splice(index, 1);
  res.json(removido);
});

module.exports = router;
