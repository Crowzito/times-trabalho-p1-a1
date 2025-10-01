const express = require("express");
const router = express.Router();

const { ListaDeTimes } = require("./times");

let ListaDePartidas = [
  {
    id: "501",
    data: "2025-10-26",
    local: "Estádio Maracanã",
    timeCasa: "101",
    timeVisitante: "102",
    placarCasa: 2,
    placarVisitante: 2,
  },
  {
    id: "502",
    data: "2025-11-02",
    local: "Allianz Parque",
    timeCasa: "102",
    timeVisitante: "101",
    placarCasa: 0,
    placarVisitante: 0,
  },
];

router.post("/partidas", (req, res, next) => {
  let { data, local, timeCasa, timeVisitante, placarCasa, placarVisitante } =
    req.body;

  if (!data || !local || !timeCasa || !timeVisitante) {
    return res.status(400).json({
      error:
        "Os campos data, local, timeCasa e timeVisitante são obrigatórios!",
    });
  }

  if (timeCasa === timeVisitante) {
    return res
      .status(400)
      .json({ error: "O time da casa não pode ser igual ao time visitante." });
  }
  const casaExiste = ListaDeTimes.find((t) => t.id === timeCasa);
  const visitanteExiste = ListaDeTimes.find((t) => t.id === timeVisitante);
  if (!casaExiste) {
    return res
      .status(404)
      .json({ error: `O time da casa com ID ${timeCasa} não foi encontrado.` });
  }
  if (!visitanteExiste) {
    return res.status(404).json({
      error: `O time visitante com ID ${timeVisitante} não foi encontrado.`,
    });
  }

  placarCasa =
    typeof placarCasa === "number" && placarCasa >= 0 ? placarCasa : 0;
  placarVisitante =
    typeof placarVisitante === "number" && placarVisitante >= 0
      ? placarVisitante
      : 0;

  const partidaExistente = ListaDePartidas.find(
    (p) =>
      p.data === data &&
      p.timeCasa === timeCasa &&
      p.timeVisitante === timeVisitante
  );
  if (partidaExistente) {
    return res
      .status(409)
      .json({ error: "Esta partida já está cadastrada para esta data." });
  }

  const novaPartida = {
    id: String(Date.now()),
    data,
    local,
    timeCasa,
    timeVisitante,
    placarCasa,
    placarVisitante,
  };

  ListaDePartidas.push(novaPartida);
  res
    .status(201)
    .json({ message: "Partida cadastrada com sucesso!", partida: novaPartida });
});

router.get("/partidas", (req, res, next) => {
  res.status(200).json(ListaDePartidas);
});

router.get("/partidas/:id", (req, res, next) => {
  const { id } = req.params;
  const partida = ListaDePartidas.find((p) => p.id === id);

  if (!partida) {
    return res.status(404).json({ error: "Partida não encontrada!" });
  }

  res.status(200).json(partida);
});

router.put("/partidas/:id", (req, res, next) => {
  const { id } = req.params;
  const { data, local, timeCasa, timeVisitante, placarCasa, placarVisitante } =
    req.body;

  if (
    !data ||
    !local ||
    !timeCasa ||
    !timeVisitante ||
    placarCasa === undefined ||
    placarVisitante === undefined
  ) {
    return res.status(400).json({
      error: "Todos os campos da partida são obrigatórios para atualização!",
    });
  }
  if (
    typeof placarCasa !== "number" ||
    typeof placarVisitante !== "number" ||
    placarCasa < 0 ||
    placarVisitante < 0
  ) {
    return res.status(400).json({
      error: "O placar de ambos os times deve ser um número positivo.",
    });
  }

  const partidaIndex = ListaDePartidas.findIndex((p) => p.id === id);
  if (partidaIndex === -1) {
    return res.status(404).json({ error: "Partida não encontrada!" });
  }

  if (timeCasa === timeVisitante) {
    return res
      .status(400)
      .json({ error: "O time da casa não pode ser igual ao time visitante." });
  }
  const casaExiste = ListaDeTimes.find((t) => t.id === timeCasa);
  const visitanteExiste = ListaDeTimes.find((t) => t.id === timeVisitante);
  if (!casaExiste) {
    return res
      .status(404)
      .json({ error: `O time da casa com ID ${timeCasa} não foi encontrado.` });
  }
  if (!visitanteExiste) {
    return res.status(404).json({
      error: `O time visitante com ID ${timeVisitante} não foi encontrado.`,
    });
  }

  const partidaAtualizada = {
    id,
    data,
    local,
    timeCasa,
    timeVisitante,
    placarCasa,
    placarVisitante,
  };
  ListaDePartidas[partidaIndex] = partidaAtualizada;

  res.status(200).json({
    message: "Partida atualizada com sucesso!",
    partida: partidaAtualizada,
  });
});

router.delete("/partidas/:id", (req, res, next) => {
  const { id } = req.params;
  const partidaIndex = ListaDePartidas.findIndex((p) => p.id === id);

  if (partidaIndex === -1) {
    return res.status(404).json({ error: "Partida não encontrada!" });
  }

  ListaDePartidas.splice(partidaIndex, 1);

  res.status(204).send();
});

module.exports = router;
