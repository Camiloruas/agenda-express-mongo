# Agenda de Contatos

Este é um projeto de uma agenda de contatos, onde você pode salvar, editar e apagar seus contatos. Para ter acesso a sua agenda, você precisa criar um usuário e senha.

## Demonstração ao Vivo

Você pode testar a aplicação em funcionamento no seguinte link:

https://agenda.camiloruas.dev/

> **Aviso:** Este aplicativo está hospedado temporariamente com créditos bônus do Google Cloud. Por isso, ele pode ficar indisponível a qualquer momento.Caso o link esteja fora do ar, siga as instruções abaixo para executar o projeto localmente.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Criação, leitura, atualização e exclusão (CRUD) de contatos.
- Associação de contatos a um usuário específico.

## Tecnologias Utilizadas

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** EJS (Embedded JavaScript templates)
- **Autenticação:** Express Session, Connect-Mongo
- **Segurança:** Helmet, CSRF (Cross-Site Request Forgery)
- **Banco de Dados:** MongoDB com Mongoose
- **Bundler:** Webpack

## Primeiros Passos

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- MongoDB (você pode usar uma instância local ou um serviço como o MongoDB Atlas)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/Camiloruas/agenda-express-mongo.git
    ```
2.  Navegue até o diretório do projeto:
    ```bash
    cd agenda-express-mongo
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

    ```
    MONGODB_URI=<sua_string_de_conexao_do_mongodb>
    SESSION_SECRET=<seu_segredo_de_sessao>
    ```

    Substitua `<sua_string_de_conexao_do_mongodb>` pela sua string de conexão do MongoDB e `<seu_segredo_de_sessao>` por uma string aleatória e segura.

### Executando a Aplicação

1.  Para iniciar o servidor de desenvolvimento (com nodemon):
    ```bash
    npm start
    ```
2.  Para compilar os assets do frontend (com webpack):
    ```bash
    npm run dev
    ```
3.  Abra seu navegador e acesse `http://localhost:3000`.

## Análise de Segurança

Durante a análise do código, não foram encontradas brechas de segurança críticas. O projeto já implementa medidas de segurança importantes, como:

- **`helmet`:** Ajuda a proteger a aplicação de algumas vulnerabilidades web conhecidas, configurando cabeçalhos HTTP de segurança.
- **`csurf`:** Protege contra ataques de Cross-Site Request Forgery (CSRF).
- **`express-session`:** Gerencia as sessões dos usuários de forma segura.
- **Senha com hash:** As senhas dos usuários são armazenadas com hash usando `bcryptjs`, o que impede que sejam lidas diretamente no banco de dados.
- **Middleware de autenticação (`loginRequired`):** Protege as rotas que só devem ser acessadas por usuários logados.

No entanto, é sempre importante manter as dependências atualizadas para corrigir possíveis vulnerabilidades que possam ser descobertas no futuro. Você pode usar o comando `npm audit` para verificar se há vulnerabilidades conhecidas nas dependências do projeto.
