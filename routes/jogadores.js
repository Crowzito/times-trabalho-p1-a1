const express = require("express");
const router = express.Router();

let ListaDeJogadores = [
    {
        id: "1",
        nome: "Gabriel Barbosa Almeida (Gabigol)",
        posicao: "Atacante",
        numeroCamisa: "9",
        nacionalidade: "Brasileira",
        dataNascimento: "1996-08-30"
    },
    {
        id: "2",
        nome: "Giorgian De Arrascaeta",
        posicao: "Meia",
        numeroCamisa: "14",
        nacionalidade: "Uruguaia",
        dataNascimento: "01/06/1994",
    },
];

router.post("/jogadores", (req, res, next) => {
    const { nome, posicao, numeroCamisa, nacionalidade, dataNascimento } = req.body;

    if (!nome || !posicao || !numeroCamisa || !nacionalidade || dataNascimento) {
        return res.status(400).json({ error: "nome, posicao, numeroCamisa, nacionalidade, dataNascimento são Obrigatorios!" });
    }

    const jogadorCadastrado = ListaDeJogadores.find(jogador => jogador.nome == nome);
    if (jogadorCadastrado) {
        return res.status(409).json({ error: "Jogador já Cadastrado!" })
    }

    const novoJogador = {
        id: Date.now(),
        nome,
        posicao,
        numeroCamisa,
        nacionalidade,
        dataNascimento,
    };

    ListaDeJogadores.push(novoJogador);
    res.status(201).json({ message: "Jogador Cadastrado com Sucesso!", jogador: novoJogador })
});

router.get("/jogadores/:id", (req, res) => {
    const idRecebido = req.params.id;
    const jogador = ListaDeJogadores.find(jogador => jogador.id == idRecebido);

    if (!jogador) {
        return res.status(404).json({ error: "Jogador não Encontrado!" });
    }

    res.status(200).json(jogador)
});

router.put("/jogadores/:id", (req, res) => {
    const idRecebido = req.params.id;
    const { nome, posicao, numeroCamisa, nacionalidade, dataNascimento } = req.body;

    if (!nome || !posicao || !numeroCamisa || !nacionalidade || !dataNascimento) {
        return res.status(400).json({
            error: "nome, posicao, numeroCamisa, nacionalidade e dataNascimento São Obrigatórios!",
        });
    }

    const jogador = ListaDeJogadores.find(jogador => jogador.id == idRecebido);
    if (!jogador) {
        return res.status(404).json({ error: "Jogador não Encontrado!" });
    }

    jogador.nome = nome;
    jogador.posicao = posicao;
    jogador.numeroCamisa = numeroCamisa;
    jogador.nacionalidade = nacionalidade;
    jogador.dataNascimento = dataNascimento;

    res.json({ message: "Jogador atualizado com Sucesso!", jogador });
});

router.delete("/jogadores/:id", (req, res) => {
    const idRecebido = req.params.id;
    const jogador = ListaDeJogadores.find(jogador => jogador.id == idRecebido);

    if (!jogador) {
        return res.status(404).json({ error: "Jogador não ENCONTRADO!!!" });
    }

    ListaDeJogadores = ListaDeJogadores.filter(jogador => jogador.id != idRecebido);

    res.json({ message: "Jogador excluído com SUCESSO!" });
});

module.exports = router;