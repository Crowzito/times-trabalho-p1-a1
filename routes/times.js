const express = require("express");
const router = express.Router();

let ListaDeTimes = [
  {
    id: "101",
    nome: "Flamengo",
    anoFundacao: "1895",
    cidadeSede: "Rio de Janeiro",
    estadio: "Maracanã",
    titulosImportantes: [
      "Copa Libertadores",
      "Mundial de Clubes",
      "Campeonato Brasileiro",
    ],
  },
  {
    id: "102",
    nome: "Palmeiras",
    anoFundacao: "1914",
    cidadeSede: "São Paulo",
    estadio: "Allianz Parque",
    titulosImportantes: ["Copa Libertadores", "Campeonato Brasileiro"],
  },
];

router.post("/times", (req, res, next) => {
  const { nome, anoFundacao, cidadeSede, estadio, titulosImportantes } =
    req.body;

  if (!nome || !anoFundacao || !cidadeSede || !estadio) {
    return res.status(400).json({
      error:
        "Os campos nome, anoFundacao, cidadeSede e estadio são obrigatórios!",
    });
  }

  if (!/^\d{4}$/.test(anoFundacao)) {
    return res
      .status(400)
      .json({ error: "O campo anoFundacao deve ser um ano com 4 dígitos." });
  }

  const timeExistente = ListaDeTimes.find(
    (t) => t.nome.toLowerCase() === nome.toLowerCase()
  );
  if (timeExistente) {
    return res
      .status(409)
      .json({ error: "Um time com este nome já está cadastrado!" });
  }

  let titulos = [];
  if (Array.isArray(titulosImportantes)) {
    titulos = titulosImportantes;
  } else if (
    typeof titulosImportantes === "string" &&
    titulosImportantes.length > 0
  ) {
    titulos = [titulosImportantes];
  }

  const novoTime = {
    id: String(Date.now()),
    nome,
    anoFundacao,
    cidadeSede,
    estadio,
    titulosImportantes: titulos,
  };

  ListaDeTimes.push(novoTime);
  res
    .status(201)
    .json({ message: "Time cadastrado com sucesso!", time: novoTime });
});

router.get("/times", (req, res, next) => {
  res.status(200).json(ListaDeTimes);
});

router.get("/times/:id", (req, res, next) => {
  const { id } = req.params;
  const time = ListaDeTimes.find((t) => t.id === id);

  if (!time) {
    return res.status(404).json({ error: "Time não encontrado!" });
  }

  res.status(200).json(time);
});

router.put("/times/:id", (req, res, next) => {
  const { id } = req.params;
  const { nome, anoFundacao, cidadeSede, estadio, titulosImportantes } =
    req.body;

  if (!nome || !anoFundacao || !cidadeSede || !estadio) {
    return res.status(400).json({
      error:
        "Os campos nome, anoFundacao, cidadeSede e estadio são obrigatórios!",
    });
  }

  if (!/^\d{4}$/.test(anoFundacao)) {
    return res
      .status(400)
      .json({ error: "O campo anoFundacao deve ser um ano com 4 dígitos." });
  }

  const timeIndex = ListaDeTimes.findIndex((t) => t.id === id);
  if (timeIndex === -1) {
    return res.status(404).json({ error: "Time não encontrado!" });
  }

  const conflitoExistente = ListaDeTimes.find(
    (t) => t.nome.toLowerCase() === nome.toLowerCase() && t.id !== id
  );
  if (conflitoExistente) {
    return res
      .status(409)
      .json({ error: "Já existe outro time com este nome!" });
  }

  let titulos = [];
  if (Array.isArray(titulosImportantes)) {
    titulos = titulosImportantes;
  } else if (
    typeof titulosImportantes === "string" &&
    titulosImportantes.length > 0
  ) {
    titulos = [titulosImportantes];
  }

  const timeAtualizado = {
    id,
    nome,
    anoFundacao,
    cidadeSede,
    estadio,
    titulosImportantes: titulos,
  };
  ListaDeTimes[timeIndex] = timeAtualizado;

  res
    .status(200)
    .json({ message: "Time atualizado com sucesso!", time: timeAtualizado });
});

router.delete("/times/:id", (req, res, next) => {
  const { id } = req.params;

  const timeIndex = ListaDeTimes.findIndex((t) => t.id === id);

  if (timeIndex === -1) {
    return res.status(404).json({ error: "Time não encontrado!" });
  }

  ListaDeTimes.splice(timeIndex, 1);

  // 204 no content
  res.status(204).send();
});

module.exports = router;
