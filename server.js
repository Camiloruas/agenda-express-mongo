// Este é o arquivo principal do servidor.
// Ele é responsável por iniciar o servidor Express, configurar o middleware
// para lidar com dados de formulário e associar as rotas da aplicação.
import dotenv from "dotenv"; // Importa a biblioteca dotenv para carregar variáveis de ambiente de um arquivo .env.
import express from "express"; // Importa o framework Express.
import routes from "./routes.js"; // Importa as definições de rotas do arquivo routes.js.
import path, { dirname } from "path"; // Importa o módulo 'path' do Node.js para lidar com caminhos de arquivos e diretórios.
import { fileURLToPath } from "url"; // Importa a função fileURLToPath para converter URLs de arquivo em caminhos.
import middleware from "./src/middlewares/middleware.js"; // Importa as funções de middleware personalizadas.
import mongoose from "mongoose"; // Importa a biblioteca mongoose para interagir com o MongoDB.
import session from "express-session"; // Importa o middleware de sessão para gerenciar sessões de usuário.
import MongoStore from "connect-mongo"; // Importa o connect-mongo para armazenar as sessões no MongoDB.
import flash from "connect-flash"; // Importa o connect-flash para exibir mensagens temporárias (flash messages).
import helmet from "helmet"; // Importa o helmet para adicionar cabeçalhos de segurança HTTP.
import csurf from "csurf"; // Importa o csurf para proteção contra ataques CSRF.

const port = 3000; // Define a porta em que o servidor será executado.
const app = express(); // Cria uma instância do aplicativo Express.
app.set('trust proxy', 1); // Adicionado para que o Express confie no proxy reverso (Nginx)
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env.

// Conecta ao MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING) // Conecta ao banco de dados MongoDB usando a string de conexão das variáveis de ambiente.
  .then(() => { // Se a conexão for bem-sucedida...
    // 1. O sinal de 'open' (depois do connect) é emitido quando a conexão é bem-sucedida
    console.log("Conectado ao MongoDB com sucesso!"); // Exibe uma mensagem de sucesso no console.
    app.emit("pronto"); // Emite um evento personalizado chamado "pronto" para indicar que o aplicativo pode iniciar.
  })
  .catch((e) => { // Se ocorrer um erro na conexão...
    // 2. Se houver erro, logamos.
    console.error("ERRO DE CONEXÃO COM O MONGODB:", e); // Exibe o erro no console.
  });
// 1. Obtém o caminho do arquivo atual (URI)
const __filename = fileURLToPath(import.meta.url); // Obtém o caminho absoluto do arquivo atual.

// 2. Obtém o caminho do diretório (dirname) a partir do caminho do arquivo
const __dirname = dirname(__filename); // Obtém o caminho absoluto do diretório atual.

app.use(express.static(path.resolve(__dirname, "public"))); // Configura o Express para servir arquivos estáticos (como CSS e JS) da pasta "public".
app.use(express.urlencoded({ extended: true })); // Configura o Express para analisar dados de formulários enviados via POST.
app.use(express.json()); // Configura o Express para analisar corpos de requisição no formato JSON.


const sessionOptions = session({ // Configura as opções para o middleware de sessão.
  secret: "asdfasdf fdghdfshsdfghsfgdhffgh gf hgfh", // Uma string secreta usada para assinar o ID da sessão.
  // 1. Removida a opção 'mongooseConnection'
  // 2. Adicionada a opção 'mongoUrl' usando a mesma variável de ambiente
  store: MongoStore.create({ // Configura o armazenamento da sessão para usar o MongoDB.
    mongoUrl: process.env.CONNECTIONSTRING, // Usa a mesma string de conexão do banco de dados para armazenar as sessões.
  }),
  resave: false, // Não salva a sessão se ela não for modificada.
  saveUninitialized: false, // Não cria uma sessão para usuários não autenticados.
  cookie: { // Configurações para o cookie da sessão.
    maxAge: 1000 * 60 * 60 * 24 * 7, // Define a duração do cookie para 7 dias.
    httpOnly: true, // Impede que o cookie seja acessado por JavaScript no lado do cliente.
  },
});

// Adicione o middleware de sessão, flash e o resto do setup do Express aqui (antes do app.on('pronto'))
// (Isso garante que esses middlewares sejam configurados antes do servidor iniciar)
app.use(helmet()); // Usa o middleware helmet para adicionar cabeçalhos de segurança.
app.use(sessionOptions); // Usa o middleware de sessão com as opções configuradas.
app.use(flash()); // Usa o middleware connect-flash para mensagens flash.
app.use(csurf()); // Usa o middleware csurf para proteção contra CSRF.
app.use(middleware.globalMiddleware);
app.use(middleware.csrfMiddleware); // Usa o middleware personalizado para disponibilizar o token CSRF para as visualizações.
app.use(middleware.checkCsurfError); // Usa o middleware para tratar erros de CSRF.
app.use(routes); // Usa as rotas definidas no arquivo routes.js.
app.set("views", path.resolve(__dirname, "src", "views")); // Define o diretório onde as visualizações (arquivos .ejs) estão localizadas.
app.set("view engine", "ejs"); // Define o motor de visualização como EJS.

app.on("pronto", () => { // Aguarda o evento "pronto" ser emitido (após a conexão com o banco de dados).
  app.listen(port, () => { // Inicia o servidor Express na porta definida.
    console.log(`Servidor está rodando na porta  ${port}`); // Exibe uma mensagem no console indicando que o servidor está em execução.
    console.log(`acesse aqui --> http://localhost:3000`); // Exibe o URL para acessar o aplicativo.
  });
});