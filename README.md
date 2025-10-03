# Trabalho A1 P1 de Construção de Backend - Tema Futebol

## 📖 Descrição

Este projeto consiste na implementação de uma API com funcionalidades baseadas em uma estrutura CRUD (Create, Read, Update, Delete). O tema norteador é o universo do futebol, abrangendo o gerenciamento de Times, Jogadores, Partidas, Técnicos e Campeonatos.

Este trabalho foi desenvolvido para a disciplina de Construção de Backend.

## 👥 Alunos e Contribuições

| Aluno(a) | GitHub | Funcionalidade |
| :--- | :--- | :--- |
| Álvaro Matheus Alves da Silva | [alvarotheuszin](https://www.google.com/search?q=https://github.com/alvarotheuszin) | Criação e implementação da funcionalidade de **Jogadores** |
| Giovanna Martins Soares | [blackinha](https://www.google.com/search?q=https://github.com/blackinha) | Criação e implementação da funcionalidade de **Times** |
| João Victor Pereira de Souza | [JoaooVictor27](https://www.google.com/search?q=https://github.com/JoaooVictor27) | Criação e implementação da funcionalidade de **Campeonatos** |
| Maria Fernanda Santos Lima de Almeida| [fe705](https://www.google.com/search?q=https://github.com/fe705) | Criação e implementação da funcionalidade de **Técnicos** |
| Pedro Victor Lopes de Souza | [Crowzito](https://www.google.com/search?q=https://github.com/Crowzito) | Criação e implementação da funcionalidade de **Partidas** |

## 🤝 CONTRIBUTING

Para detalhes sobre como contribuir com este projeto, seguir nosso fluxo de trabalho e padrões de commit, por favor, leia nosso guia de contribuição.

➡️ **[CONTRIBUTING.md](CONTRIBUTING.md)**

## 🚀 Como Rodar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Crowzito/times-trabalho-p1-a1.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd times-trabalho-p1-a1
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    Após a execução, o servidor estará rodando em `http://localhost:3000`.

## 🔌 Endpoints da API

Abaixo estão os endpoints disponíveis para cada funcionalidade.

### **Times** (`/times`)

  - `GET /times`: Lista todos os times cadastrados.
  - `GET /times/:id`: Obtém um time específico pelo seu ID.
  - `POST /times`: Cria um novo time.
  - `PUT /times/:id`: Atualiza um time existente pelo seu ID.
  - `DELETE /times/:id`: Exclui um time pelo seu ID.

### **Jogadores** (`/jogadores`)

  - `GET /jogadores`: Lista todos os jogadores cadastrados.
  - `GET /jogadores/:id`: Obtém um jogador específico pelo seu ID.
  - `POST /jogadores`: Cria um novo jogador.
  - `PUT /jogadores/:id`: Atualiza um jogador existente pelo seu ID.
  - `DELETE /jogadores/:id`: Exclui um jogador pelo seu ID.

### **Campeonatos** (`/campeonatos`)

  - `GET /campeonatos`: Lista todos os campeonatos.
  - `GET /campeonatos/:id`: Obtém um campeonato específico pelo seu ID.
  - `POST /campeonatos`: Cria um novo campeonato.
  - `PUT /campeonatos/:id`: Atualiza um campeonato existente pelo seu ID.
  - `DELETE /campeonatos/:id`: Exclui um campeonato pelo seu ID.

### **Técnicos** (`/tecnicos`)

  - `GET /tecnicos`: Lista todos os técnicos.
  - `GET /tecnicos/:id`: Obtém um técnico específico pelo seu ID.
  - `POST /tecnicos`: Cria um novo técnico.
  - `PUT /tecnicos/:id`: Atualiza um técnico existente pelo seu ID.
    \--   `DELETE /tecnicos/:id`: Exclui um técnico pelo seu ID.

### **Partidas** (`/partidas`)

  - `GET /partidas`: Lista todas as partidas.
  - `GET /partidas/:id`: Obtém uma partida específica pelo seu ID.
  - `POST /partidas`: Cria uma nova partida.
  - `PUT /partidas/:id`: Atualiza uma partida existente pelo seu ID.
  - `DELETE /partidas/:id`: Exclui uma partida pelo seu ID.