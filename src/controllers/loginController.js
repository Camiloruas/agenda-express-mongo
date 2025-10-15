import Login from "../models/LoginModel.js"; // Importa a classe Login do modelo, que contém a lógica de autenticação.

export default {
  // Exporta um objeto com os métodos do controlador.
  index: (req, res) => {
    // Método para exibir a página de login.
    res.render("login"); // Renderiza a página de visualização "login.ejs".
  },

  login: async (req, res) => {
    // Método assíncrono para processar o formulário de login.
    try {
      // Inicia um bloco try-catch para lidar com possíveis erros.
      const login = new Login(req.body); // Cria uma nova instância da classe Login com os dados do formulário.
      await login.login(); // Chama o método de login da instância para autenticar o usuário.

      if (login.errors.length > 0) {
        // Verifica se ocorreram erros de autenticação.
        req.flash("errors", login.errors); // Se houver erros, armazena as mensagens de erro em uma "flash message".
        req.session.save(() => {
          // Salva a sessão antes de redirecionar.
          return res.redirect("/login"); // Redireciona o usuário de volta para a página de login.
        });
        return; // Interrompe a execução do método.
      }

      req.flash("success", "Você entrou no sistema."); // Se o login for bem-sucedido, armazena uma mensagem de sucesso.
      req.session.user = login.user; // Armazena os dados do usuário na sessão, mantendo-o conectado.
      req.session.save(() => {
        // Salva a sessão antes de redirecionar.
        return res.redirect("/agenda"); // Redireciona o usuário para a página da agenda.
      });
    } catch (e) {
      // Captura qualquer erro inesperado.
      console.log(e); // Exibe o erro no console.
      return res.render("404"); // Renderiza uma página de erro 404.
    }
  },

  logout: (req, res) => {
    // Método para fazer logout do usuário.
    req.session.destroy(); // Destrói a sessão do usuário, desconectando-o.
    res.redirect("/login"); // Redireciona o usuário para a página de login.
  },
};
