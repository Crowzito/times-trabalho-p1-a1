const express = require("express");
const router = express.Router();

const { ListaDeTimes } = require("./times");

let ListaDeCampeonatos = [];

if (ListaDeTimes && ListaDeTimes.length >= 2) {
  ListaDeCampeonatos = [
    {
      id: "1",
      nome: "Brasileirão Série A",
      ano: "2025",
      pais: "Brasil",
      timesParticipantes: ListaDeTimes.map((time) => time.id),
      campeao: ListaDeTimes[1].id,
    },
    {
      id: "2",
      nome: "Premier League",
      ano: "2025",
      pais: "Inglaterra",
      timesParticipantes: [],
      campeao: "",
    },
  ];
}

router.post("/campeonatos", (req, res, next) => {
  const { nome, ano, pais, timesParticipantes } = req.body;

  if (!nome || !ano || !pais) {
    return res
      .status(400)
      .json({ error: "Os campos nome, ano e país são obrigatórios!" });
  }

  const campeonatoExistente = ListaDeCampeonatos.find(
    (c) => c.nome.toLowerCase() === nome.toLowerCase() && c.ano === ano
  );
  if (campeonatoExistente) {
    return res
      .status(409)
      .json({ error: "Este campeonato já está cadastrado para este ano!" });
  }

  const participantes = Array.isArray(timesParticipantes)
    ? timesParticipantes
    : [];
  const todosOsTimesExistem = participantes.every((timeId) =>
    ListaDeTimes.some((time) => time.id === timeId)
  );
  if (!todosOsTimesExistem) {
    return res.status(404).json({
      error:
        "Um ou mais IDs de times em 'timesParticipantes' não foram encontrados.",
    });
  }

  const novoCampeonato = {
    id: String(Date.now()),
    nome,
    ano,
    pais,
    timesParticipantes: participantes,
    campeao: "",
  };

  ListaDeCampeonatos.push(novoCampeonato);
  res.status(201).json({
    message: "Campeonato cadastrado com sucesso!",
    campeonato: novoCampeonato,
  });
});

router.get("/campeonatos", (req, res, next) => {
  res.status(200).json(ListaDeCampeonatos);
});

router.get("/campeonatos/:id", (req, res, next) => {
  const { id } = req.params;
  const campeonato = ListaDeCampeonatos.find((c) => c.id === id);

  if (!campeonato) {
    return res.status(404).json({ error: "Campeonato não encontrado!" });
  }

  res.status(200).json(campeonato);
});

router.put("/campeonatos/:id", (req, res, next) => {
  const { id } = req.params;
  const { nome, ano, pais, timesParticipantes, campeao } = req.body;

  if (!nome || !ano || !pais || !Array.isArray(timesParticipantes)) {
    return res.status(400).json({
      error:
        "Os campos nome, ano, país e timesParticipantes (como array) são obrigatórios!",
    });
  }

  const campeonatoIndex = ListaDeCampeonatos.findIndex((c) => c.id === id);
  if (campeonatoIndex === -1) {
    return res.status(404).json({ error: "Campeonato não encontrado!" });
  }

  const conflitoExistente = ListaDeCampeonatos.find(
    (c) =>
      c.nome.toLowerCase() === nome.toLowerCase() &&
      c.ano === ano &&
      c.id !== id
  );
  if (conflitoExistente) {
    return res
      .status(409)
      .json({ error: "Já existe outro campeonato com este nome e ano!" });
  }

  const todosOsTimesExistem = timesParticipantes.every((timeId) =>
    ListaDeTimes.some((time) => time.id === timeId)
  );
  if (!todosOsTimesExistem) {
    return res.status(404).json({
      error:
        "Um ou mais IDs de times em 'timesParticipantes' não foram encontrados.",
    });
  }

  if (campeao && !timesParticipantes.includes(campeao)) {
    return res.status(400).json({
      error: "O time campeão deve estar na lista de times participantes!",
    });
  }

  const campeonatoAtualizado = {
    id,
    nome,
    ano,
    pais,
    timesParticipantes,
    campeao: campeao || "",
  };

  ListaDeCampeonatos[campeonatoIndex] = campeonatoAtualizado;
  res.status(200).json({
    message: "Campeonato atualizado com sucesso!",
    campeonato: campeonatoAtualizado,
  });
});

router.delete("/campeonatos/:id", (req, res, next) => {
  const { id } = req.params;
  const campeonatoExiste = ListaDeCampeonatos.some((c) => c.id === id);

  if (!campeonatoExiste) {
    return res.status(404).json({ error: "Campeonato não encontrado!" });
  }

  ListaDeCampeonatos = ListaDeCampeonatos.filter((c) => c.id !== id);

  // 204 no content
  res.status(204).send();
});

module.exports = router;
