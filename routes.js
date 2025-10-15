// Este arquivo é responsável por definir as rotas da aplicação.
// Ele importa os controladores e os associa a cada rota específica.
// Por exemplo, a rota "/" está associada ao "homeController".

import express from "express"; // Importa a biblioteca Express, que é o framework web que estamos usando.
import homeController from "./src/controllers/homeController.js"; // Importa o controlador da página inicial.
import loginController from "./src/controllers/loginController.js"; // Importa o controlador de login.
import registerController from "./src/controllers/registerController.js"; // Importa o controlador de registro.
import contactController from "./src/controllers/contactController.js"; // Importa o controlador de contatos.
import agendaController from "./src/controllers/agendaController.js"; // Importa o controlador da agenda.
import middleware from "./src/middlewares/middleware.js";

const route = express.Router(); // Cria uma nova instância do roteador do Express para definir as rotas.

route.get("/", homeController.index);

// Rota da agenda
route.get("/agenda", middleware.loginRequired, agendaController.index);

// Rotas de registro
route.get("/register", registerController.index); // Define a rota GET /register para exibir a página de registro, tratada pelo método 'index' do 'registerController'.
route.post("/register", registerController.register); // Define a rota POST /register para processar o formulário de registro, tratada pelo método 'register' do 'registerController'.

// Rotas de login
route.get("/login", loginController.index); // Define a rota GET /login para exibir a página de login, tratada pelo método 'index' do 'loginController'.
route.post("/login", loginController.login); // Define a rota POST /login para processar o formulário de login, tratada pelo método 'login' do 'loginController'.
route.get("/logout", loginController.logout); // Define a rota GET /logout para fazer logout do usuário, tratada pelo método 'logout' do 'loginController'.

// Rotas de contato
route.get("/contact", middleware.loginRequired, contactController.index);
route.post("/contact/create", middleware.loginRequired, contactController.create);
route.get("/contact/:id", middleware.loginRequired, contactController.editIndex);
route.post(
  "/contact/edit/:id",
  middleware.loginRequired,
  contactController.edit
);
route.get(
  "/contact/delete/:id",
  middleware.loginRequired,
  contactController.delete
);

export default route; // Exporta o roteador com todas as rotas definidas para ser usado no arquivo principal do servidor.
