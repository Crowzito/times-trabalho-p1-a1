# Guia de Contribuição

Obrigado pelo seu interesse em contribuir para o projeto\! Para garantir a consistência, a organização do nosso versionamento e a qualidade do código, por favor, siga o passo a passo abaixo.

## Workflow de Desenvolvimento

### 1\. Sincronize seu Repositório Local

Antes de começar a trabalhar, garanta que sua branch `main` local está atualizada com a versão remota.

```bash
# Vá para a branch principal
git checkout main

# Baixe as atualizações mais recentes
git pull
```

### 2\. Crie uma Nova Branch

Nunca trabalhe diretamente na branch `main`. Crie sempre uma nova branch a partir da `main` para a sua funcionalidade ou correção. O nome da branch deve ser descritivo e, se aplicável, referenciar o número da _issue_ que você está resolvendo.

```bash
# Crie e mude para a sua nova branch com um único comando
git checkout -b nome-da-sua-branch
```

_Exemplo: `git checkout -b feat/crud-jogadores` ou `git checkout -b fix/bug-login-52`_

Para visualizar todas as branches remotas, você pode usar:

```bash
git branch -r
```

### 3\. Desenvolva seu Código

Faça todas as alterações, crie os arquivos e desenvolva a sua funcionalidade ou correção dentro da branch que você acabou de criar.

### 4\. Adicione e "Commite" suas Alterações

Quando finalizar o trabalho (ou uma parte significativa dele), adicione os arquivos e crie um commit seguindo o padrão **Conventional Commits**.

```bash
# Adicione todos os arquivos modificados para a área de "stage"
git add .

# Crie o commit com uma mensagem padronizada
git commit -m "tipo: descrição da alteração"
```

#### Padrão de Commits (Conventional Commits)

Utilizamos este padrão para manter o histórico de commits claro e legível.

- **`feat`**: Para uma nova funcionalidade adicionada ao código.
  - _Exemplo:_ `feat: implementa a funcionalidade CRUD de Times`
- **`fix`**: Para a correção de um bug.
  - _Exemplo:_ `fix: corrige a rota de atualização PUT do CRUD de Times`
- **`docs`**: Para alterações exclusivas na documentação.
  - _Exemplo:_ `docs: atualiza o README com os EndPoints da API`

### 5\. Envie suas Alterações para o Repositório Remoto

Envie a sua branch com os seus commits para o repositório remoto no GitHub.

```bash
# O '-u' (ou --set-upstream) cria um link entre sua branch local e a remota
git push -u origin nome-da-sua-branch
```

### 6\. Crie um Pull Request (PR)

1.  Acesse a página do repositório no GitHub.
2.  O GitHub geralmente detectará que você enviou uma nova branch e mostrará um botão **"Compare & pull request"**. Clique nele.
3.  Se não aparecer, vá para a aba **"Pull Requests"** e clique em **"New pull request"**.
4.  Selecione a sua branch como a origem (`compare`) e a branch `main` como o destino (`base`).
5.  Adicione um título claro e uma descrição detalhada sobre o que foi feito no seu Pull Request.
6.  Clique em **"Create pull request"**.

Após criar o PR, aguarde a revisão de outros membros da equipe. Eles podem aprovar e fazer o _merge_ para a `main` ou solicitar correções.
