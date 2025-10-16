import Register from "../models/RegisterModel.js"; // Importa a classe Register do modelo, que contém a lógica de registro.

export default { // Exporta um objeto com os métodos do controlador.
  index: (req, res) => { // Método para exibir a página de registro.
    res.render("register"); // Renderiza (envia para o navegador) a página de visualização "register.ejs".
  },

  register: async (req, res) => { // Método assíncrono para processar o formulário de registro.
    try { // Inicia um bloco try-catch para lidar com possíveis erros durante o processo.
      const register = new Register(req.body); // Cria uma nova instância da classe Register, passando os dados do formulário.
      await register.register(); // Chama o método register da instância para validar e salvar o novo usuário.

      if (register.errors.length > 0) { // Verifica se ocorreram erros de validação.
        req.flash("errors", register.errors); // Se houver erros, armazena as mensagens de erro em uma "flash message".
        req.session.save(() => { // Salva a sessão antes de redirecionar.
          return res.redirect("/register"); // Redireciona o usuário de volta para a página de registro para corrigir os erros.
        });
        return; // Interrompe a execução do método.
      }

      req.flash("success", "Seu usuário foi criado com sucesso!"); // Se o registro for bem-sucedido, armazena uma mensagem de sucesso.
      req.session.save(() => { // Salva a sessão antes de redirecionar.
        return res.redirect("/login"); // Redireciona o usuário para a página de login.
      });
    } catch (e) { // Captura qualquer erro inesperado que possa ocorrer.
      console.log(e); // Exibe o erro no console para fins de depuração.
      return res.render("includes/404"); // Renderiza uma página de erro 404.
    }
  },
};