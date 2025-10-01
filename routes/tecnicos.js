const express = require("express");
const router = express.Router();

const { ListaDeTimes } = require("./times");

let ListaDeTecnicos = [];

if (ListaDeTimes && ListaDeTimes.length >= 2) {
  ListaDeTecnicos = [
    {
      id: "301",
      nome: "Abel Ferreira",
      nacionalidade: "Portuguesa",
      experienciaAnos: 12,
      timeAtual: ListaDeTimes[1].id,
      encerramentoContrato: "2027",
    },
    {
      id: "302",
      nome: "Tite",
      nacionalidade: "Brasileira",
      experienciaAnos: 33,
      timeAtual: ListaDeTimes[0].id,
      encerramentoContrato: "2026",
    },
    {
      id: "303",
      nome: "Phelipe Coutinho",
      nacionalidade: "Brasileira",
      experienciaAnos: 28,
      timeAtual: "",
      encerramentoContrato: "",
    },
  ];
}

router.post("/tecnicos", (req, res, next) => {
  const {
    nome,
    nacionalidade,
    experienciaAnos,
    timeAtual,
    encerramentoContrato,
  } = req.body;

  if (!nome || !nacionalidade || experienciaAnos === undefined) {
    return res.status(400).json({
      error:
        "Os campos nome, nacionalidade e experienciaAnos são obrigatórios!",
    });
  }
  if (typeof experienciaAnos !== "number" || experienciaAnos < 0) {
    return res
      .status(400)
      .json({ error: "O campo experienciaAnos deve ser um número positivo." });
  }

  const tecnicoExistente = ListaDeTecnicos.find(
    (t) => t.nome.toLowerCase() === nome.toLowerCase()
  );
  if (tecnicoExistente) {
    return res
      .status(409)
      .json({ error: "Um técnico com este nome já está cadastrado!" });
  }

  if (timeAtual) {
    const timeExiste = ListaDeTimes.find((t) => t.id === timeAtual);
    if (!timeExiste) {
      return res
        .status(404)
        .json({ error: `O time com ID ${timeAtual} não foi encontrado!` });
    }

    const timeOcupado = ListaDeTecnicos.find((t) => t.timeAtual === timeAtual);
    if (timeOcupado) {
      return res.status(409).json({
        error: `O time ${timeExiste.nome} já possui um técnico (${timeOcupado.nome})!`,
      });
    }

    if (!encerramentoContrato || !/^\d{4}$/.test(encerramentoContrato)) {
      return res.status(400).json({
        error:
          "Se um timeAtual é fornecido, o encerramentoContrato (ano com 4 dígitos) é obrigatório.",
      });
    }
  }

  const novoTecnico = {
    id: String(Date.now()),
    nome,
    nacionalidade,
    experienciaAnos,
    timeAtual: timeAtual || "",
    encerramentoContrato: timeAtual ? encerramentoContrato : "",
  };

  ListaDeTecnicos.push(novoTecnico);
  res
    .status(201)
    .json({ message: "Técnico cadastrado com sucesso!", tecnico: novoTecnico });
});

router.get("/tecnicos", (req, res, next) => {
  res.status(200).json(ListaDeTecnicos);
});

router.get("/tecnicos/:id", (req, res, next) => {
  const { id } = req.params;
  const tecnico = ListaDeTecnicos.find((t) => t.id === id);

  if (!tecnico) {
    return res.status(404).json({ error: "Técnico não encontrado!" });
  }

  res.status(200).json(tecnico);
});

router.put("/tecnicos/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    nome,
    nacionalidade,
    experienciaAnos,
    timeAtual,
    encerramentoContrato,
  } = req.body;

  if (!nome || !nacionalidade || experienciaAnos === undefined) {
    return res.status(400).json({
      error:
        "Os campos nome, nacionalidade e experienciaAnos são obrigatórios!",
    });
  }
  if (typeof experienciaAnos !== "number" || experienciaAnos < 0) {
    return res
      .status(400)
      .json({ error: "O campo experienciaAnos deve ser um número positivo." });
  }

  const tecnicoIndex = ListaDeTecnicos.findIndex((t) => t.id === id);
  if (tecnicoIndex === -1) {
    return res.status(404).json({ error: "Técnico não encontrado!" });
  }

  const conflitoNome = ListaDeTecnicos.find(
    (t) => t.nome.toLowerCase() === nome.toLowerCase() && t.id !== id
  );
  if (conflitoNome) {
    return res
      .status(409)
      .json({ error: "Já existe outro técnico com este nome!" });
  }

  if (timeAtual) {
    const timeExiste = ListaDeTimes.find((t) => t.id === timeAtual);
    if (!timeExiste) {
      return res
        .status(404)
        .json({ error: `O time com ID ${timeAtual} não foi encontrado!` });
    }

    const timeOcupado = ListaDeTecnicos.find(
      (t) => t.timeAtual === timeAtual && t.id !== id
    );
    if (timeOcupado) {
      return res.status(409).json({
        error: `O time ${timeExiste.nome} já possui um técnico (${timeOcupado.nome})!`,
      });
    }

    if (!encerramentoContrato || !/^\d{4}$/.test(encerramentoContrato)) {
      return res.status(400).json({
        error:
          "Se um timeAtual é fornecido, o encerramentoContrato (ano com 4 dígitos) é obrigatório.",
      });
    }
  }

  const tecnicoAtualizado = {
    id,
    nome,
    nacionalidade,
    experienciaAnos,
    timeAtual: timeAtual || "",
    encerramentoContrato: timeAtual ? encerramentoContrato : "",
  };
  ListaDeTecnicos[tecnicoIndex] = tecnicoAtualizado;

  res.status(200).json({
    message: "Técnico atualizado com sucesso!",
    tecnico: tecnicoAtualizado,
  });
});

router.delete("/tecnicos/:id", (req, res, next) => {
  const { id } = req.params;
  const tecnicoIndex = ListaDeTecnicos.findIndex((t) => t.id === id);

  if (tecnicoIndex === -1) {
    return res.status(404).json({ error: "Técnico não encontrado!" });
  }

  ListaDeTecnicos.splice(tecnicoIndex, 1);

  // 204 no content
  res.status(204).send();
});

module.exports = router;
