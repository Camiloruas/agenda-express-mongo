export default {
  // Exporta um objeto contendo todas as funções de middleware.
  globalMiddleware: (req, res, next) => {
    // Uma função de middleware de exemplo.
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    next(); // Chama a próxima função de middleware na pilha.
  },

  checkCsurfError: (err, req, res, next) => {
    // Middleware para verificar erros de CSRF (Cross-Site Request Forgery).
    if (err && err.code === "EBADCSRFTOKEN") {
      // Verifica se ocorreu um erro e se o código do erro é específico para um token CSRF inválido.
      return res.render("includes/404"); // Se o token for inválido, renderiza uma página de erro 404.
    }
    next(err); // Se não for um erro de CSRF, passa o erro para o próximo middleware de tratamento de erros.
  },

  csrfMiddleware: (req, res, next) => {
    // Middleware para gerar e disponibilizar o token CSRF.
    res.locals.csrfToken = req.csrfToken(); // Gera um novo token CSRF e o torna disponível para as visualizações como 'csrfToken'.
    next(); // Chama a próxima função de middleware.
  },

  flashMiddleware: (req, res, next) => {
    // Middleware para lidar com mensagens flash (mensagens temporárias).
    res.locals.errors = req.flash("errors"); // Obtém as mensagens flash de erro e as torna disponíveis para as visualizações como 'errors'.
    res.locals.success = req.flash("success"); // Obtém as mensagens flash de sucesso e as torna disponíveis para as visualizações como 'success'.
    next(); // Chama a próxima função de middleware.
  },

  loginRequired: (req, res, next) => {
    if (!req.session.user) {
      req.flash("errors", "Você precisa fazer login.");
      req.session.save(() => res.redirect("/login"));
      return;
    }
    next();
  },
};
