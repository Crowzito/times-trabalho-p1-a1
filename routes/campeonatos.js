const express = require("express");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

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


function validarCampos(req, res, next) {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ error: erros.array().map(e => e.msg) });
  }
  next();
}


router.post(
  "/campeonatos",
  [
    body("nome").notEmpty().withMessage("O campo 'nome' é obrigatório."),
    body("ano")
      .notEmpty()
      .withMessage("O campo 'ano' é obrigatório.")
      .isInt({ min: 1900 })
      .withMessage("O campo 'ano' deve ser um número válido."),
    body("pais").notEmpty().withMessage("O campo 'pais' é obrigatório."),
    body("timesParticipantes").optional().isArray().withMessage("'timesParticipantes' deve ser um array."),
  ],
  validarCampos,
  (req, res) => {
    const { nome, ano, pais, timesParticipantes = [] } = req.body;

    
    const campeonatoExistente = ListaDeCampeonatos.find(
      (c) => c.nome.toLowerCase() === nome.toLowerCase() && c.ano === ano
    );
    if (campeonatoExistente) {
      return res
        .status(409)
        .json({ error: "Este campeonato já está cadastrado para este ano." });
    }

   
    const todosOsTimesExistem = timesParticipantes.every((timeId) =>
      ListaDeTimes.some((time) => time.id === timeId)
    );
    if (!todosOsTimesExistem) {
      return res.status(404).json({
        error: "Um ou mais IDs de times em 'timesParticipantes' não foram encontrados.",
      });
    }

    const novoCampeonato = {
      id: uuidv4(),
      nome,
      ano,
      pais,
      timesParticipantes,
      campeao: "",
    };

    ListaDeCampeonatos.push(novoCampeonato);
    res.status(201).json({
      message: "Campeonato cadastrado com sucesso!",
      campeonato: novoCampeonato,
    });
  }
);


router.get("/campeonatos", (req, res) => {
  res.status(200).json(ListaDeCampeonatos);
});


router.get("/campeonatos/:id", (req, res) => {
  const { id } = req.params;
  const campeonato = ListaDeCampeonatos.find((c) => c.id === id);

  if (!campeonato) {
    return res.status(404).json({ error: "Campeonato não encontrado." });
  }

  res.status(200).json(campeonato);
});



router.put(
  "/campeonatos/:id",
  [
    body("nome").notEmpty().withMessage("O campo 'nome' é obrigatório."),
    body("ano")
      .notEmpty()
      .withMessage("O campo 'ano' é obrigatório.")
      .isInt({ min: 1900 })
      .withMessage("O campo 'ano' deve ser um número válido."),
    body("pais").notEmpty().withMessage("O campo 'pais' é obrigatório."),
    body("timesParticipantes")
      .isArray()
      .withMessage("'timesParticipantes' deve ser um array."),
  ],
  validarCampos,
  (req, res) => {
    const { id } = req.params;
    const { nome, ano, pais, timesParticipantes, campeao } = req.body;

    const campeonatoIndex = ListaDeCampeonatos.findIndex((c) => c.id === id);
    if (campeonatoIndex === -1) {
      return res.status(404).json({ error: "Campeonato não encontrado." });
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
        .json({ error: "Já existe outro campeonato com este nome e ano." });
    }

    const todosOsTimesExistem = timesParticipantes.every((timeId) =>
      ListaDeTimes.some((time) => time.id === timeId)
    );
    if (!todosOsTimesExistem) {
      return res.status(404).json({
        error: "Um ou mais IDs de times em 'timesParticipantes' não foram encontrados.",
      });
    }

    if (campeao && !timesParticipantes.includes(campeao)) {
      return res.status(400).json({
        error: "O time campeão deve estar na lista de times participantes.",
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
  }
);


router.delete("/campeonatos/:id", (req, res) => {
  const { id } = req.params;
  const campeonatoExiste = ListaDeCampeonatos.some((c) => c.id === id);

  if (!campeonatoExiste) {
    return res.status(404).json({ error: "Campeonato não encontrado." });
  }

  ListaDeCampeonatos = ListaDeCampeonatos.filter((c) => c.id !== id);
  res.status(204).send();
});

module.exports = router;