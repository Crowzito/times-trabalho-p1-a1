const express = require("express");
const router = express.Router();

let ListaDeJogadores = [
  {
    id: "401",
    nome: "Giorgian De Arrascaeta",
    posicao: "Meio-campista",
    numeroCamisa: 14,
    nacionalidade: "Uruguaia",
    dataNascimento: "1994-06-01",
  },
  {
    id: "402",
    nome: "Raphael Veiga",
    posicao: "Meio-campista",
    numeroCamisa: 23,
    nacionalidade: "Brasileira",
    dataNascimento: "1995-06-19",
  },
];

router.post("/jogadores", (req, res, next) => {
  const { nome, posicao, numeroCamisa, nacionalidade, dataNascimento } =
    req.body;

  if (!nome || !posicao || !numeroCamisa || !nacionalidade || !dataNascimento) {
    return res.status(400).json({
      error:
        "Os campos nome, posicao, numeroCamisa, nacionalidade e dataNascimento são obrigatórios!",
    });
  }

  if (typeof numeroCamisa !== "number" || numeroCamisa <= 0) {
    return res
      .status(400)
      .json({ error: "O campo numeroCamisa deve ser um número positivo." });
  }

  const jogadorExistente = ListaDeJogadores.find(
    (j) => j.nome.toLowerCase() === nome.toLowerCase()
  );
  if (jogadorExistente) {
    return res
      .status(409)
      .json({ error: "Um jogador com este nome já está cadastrado!" });
  }

  const novoJogador = {
    id: String(Date.now()),
    nome,
    posicao,
    numeroCamisa,
    nacionalidade,
    dataNascimento,
  };

  ListaDeJogadores.push(novoJogador);
  res
    .status(201)
    .json({ message: "Jogador cadastrado com sucesso!", jogador: novoJogador });
});

router.get("/jogadores", (req, res, next) => {
  res.status(200).json(ListaDeJogadores);
});

router.get("/jogadores/:id", (req, res, next) => {
  const { id } = req.params;
  const jogador = ListaDeJogadores.find((j) => j.id === id);

  if (!jogador) {
    return res.status(404).json({ error: "Jogador não encontrado!" });
  }

  res.status(200).json(jogador);
});

router.put("/jogadores/:id", (req, res, next) => {
  const { id } = req.params;
  const { nome, posicao, numeroCamisa, nacionalidade, dataNascimento } =
    req.body;

  if (!nome || !posicao || !numeroCamisa || !nacionalidade || !dataNascimento) {
    return res.status(400).json({
      error: "Todos os campos do jogador são obrigatórios para atualização!",
    });
  }
  if (typeof numeroCamisa !== "number" || numeroCamisa <= 0) {
    return res
      .status(400)
      .json({ error: "O campo numeroCamisa deve ser um número positivo." });
  }

  const jogadorIndex = ListaDeJogadores.findIndex((j) => j.id === id);
  if (jogadorIndex === -1) {
    return res.status(404).json({ error: "Jogador não encontrado!" });
  }

  const conflitoExistente = ListaDeJogadores.find(
    (j) => j.nome.toLowerCase() === nome.toLowerCase() && j.id !== id
  );
  if (conflitoExistente) {
    return res
      .status(409)
      .json({ error: "Já existe outro jogador com este nome!" });
  }

  const jogadorAtualizado = {
    id,
    nome,
    posicao,
    numeroCamisa,
    nacionalidade,
    dataNascimento,
  };
  ListaDeJogadores[jogadorIndex] = jogadorAtualizado;

  res.status(200).json({
    message: "Jogador atualizado com sucesso!",
    jogador: jogadorAtualizado,
  });
});

router.delete("/jogadores/:id", (req, res, next) => {
  const { id } = req.params;
  const jogadorIndex = ListaDeJogadores.findIndex((j) => j.id === id);

  if (jogadorIndex === -1) {
    return res.status(404).json({ error: "Jogador não encontrado!" });
  }

  ListaDeJogadores.splice(jogadorIndex, 1);

  res.status(204).send();
});

module.exports = router;
