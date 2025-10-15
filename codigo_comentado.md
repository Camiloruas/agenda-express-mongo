# Código Comentado do Projeto

Este arquivo contém todo o código-fonte dos arquivos `.js` da pasta `src` e do arquivo `routes.js`, com comentários detalhados em cada linha para facilitar o estudo.

## `routes.js`

```javascript
// Este arquivo é responsável por definir as rotas da aplicação.
// Ele importa os controladores e os associa a cada rota específica.
// Por exemplo, a rota "/" está associada ao "homeController".

import express from "express"; // Importa a biblioteca Express, que é o framework web que estamos usando.
import homeController from "./src/controllers/homeController.js"; // Importa o controlador da página inicial.
import loginController from "./src/controllers/loginController.js"; // Importa o controlador de login.
import registerController from "./src/controllers/registerController.js"; // Importa o controlador de registro.
const route = express.Router(); // Cria uma nova instância do roteador do Express para definir as rotas.

route.get("/", homeController.index); // Define a rota principal (GET /) para ser tratada pelo método 'index' do 'homeController'.

// Rotas de registro
route.get("/register", registerController.index); // Define a rota GET /register para exibir a página de registro, tratada pelo método 'index' do 'registerController'.
route.post("/register", registerController.register); // Define a rota POST /register para processar o formulário de registro, tratada pelo método 'register' do 'registerController'.

// Rotas de login
route.get("/login", loginController.index); // Define a rota GET /login para exibir a página de login, tratada pelo método 'index' do 'loginController'.
route.post("/login", loginController.login); // Define a rota POST /login para processar o formulário de login, tratada pelo método 'login' do 'loginController'.
route.get("/logout", loginController.logout); // Define a rota GET /logout para fazer logout do usuário, tratada pelo método 'logout' do 'loginController'.

export default route; // Exporta o roteador com todas as rotas definidas para ser usado no arquivo principal do servidor.
```

## `src/controllers/homeController.js`

```javascript
// Este arquivo é o controlador da página inicial.
// Ele define o que acontece quando um usuário acessa a rota principal ("/").
// Ele envia um formulário HTML para o navegador e também lida com o envio desse formulário.

export default { // Exporta um objeto com os métodos do controlador.
  index: (req, res, next) => { // Método para lidar com a rota da página inicial.
    res.render("index"); // Renderiza (envia para o navegador) a página de visualização "index.ejs".
    return; // Encerra a execução do método.
  },
};
```

## `src/controllers/loginController.js`

```javascript
import Login from "../models/LoginModel.js"; // Importa a classe Login do modelo, que contém a lógica de autenticação.

export default { // Exporta um objeto com os métodos do controlador.
  index: (req, res) => { // Método para exibir a página de login.
    res.render("login"); // Renderiza a página de visualização "login.ejs".
  },

  login: async (req, res) => { // Método assíncrono para processar o formulário de login.
    try { // Inicia um bloco try-catch para lidar com possíveis erros.
      const login = new Login(req.body); // Cria uma nova instância da classe Login com os dados do formulário.
      await login.login(); // Chama o método de login da instância para autenticar o usuário.

      if (login.errors.length > 0) { // Verifica se ocorreram erros de autenticação.
        req.flash("errors", login.errors); // Se houver erros, armazena as mensagens de erro em uma "flash message".
        req.session.save(() => { // Salva a sessão antes de redirecionar.
          return res.redirect("/login"); // Redireciona o usuário de volta para a página de login.
        });
        return; // Interrompe a execução do método.
      }

      req.flash("success", "Você entrou entrou na agenda."); // Se o login for bem-sucedido, armazena uma mensagem de sucesso.
      req.session.user = login.user; // Armazena os dados do usuário na sessão, mantendo-o conectado.
      req.session.save(() => { // Salva a sessão antes de redirecionar.
        return res.redirect("/"); // Redireciona o usuário para a página inicial.
      });
    } catch (e) { // Captura qualquer erro inesperado.
      console.log(e); // Exibe o erro no console.
      return res.render("404"); // Renderiza uma página de erro 404.
    }
  },

  logout: (req, res) => { // Método para fazer logout do usuário.
    req.session.destroy(); // Destrói a sessão do usuário, desconectando-o.
    res.redirect("/"); // Redireciona o usuário para a página inicial.
  }
};
```

## `src/controllers/registerController.js`

```javascript
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
      return res.render("404"); // Renderiza uma página de erro 404.
    }
  },
};
```

## `src/middlewares/middleware.js`

```javascript
export default { // Exporta um objeto contendo todas as funções de middleware.
  meuMiddleware: (req, res, next) => { // Uma função de middleware de exemplo.
    res.locals.umaVariavelLocal = "Este é o valor a variavel local '"; // Define uma variável local que estará disponível em todas as visualizações (views).

    console.log(); // Imprime uma linha em branco no console.
    if (req.body.cliente) { // Verifica se o corpo da requisição contém um campo chamado 'cliente'.
      console.log(); // Imprime uma linha em branco no console.
      console.log(`Vi que você Postou ${req.body.cliente}`); // Imprime uma mensagem no console com o valor do campo 'cliente'.
      console.log(); // Imprime uma linha em branco no console.
    }
    next(); // Chama a próxima função de middleware na pilha.
  },

  checkCsurfError: (err, req, res, next) => { // Middleware para verificar erros de CSRF (Cross-Site Request Forgery).
    if (err && err.code === "EBADCSRFTOKEN") { // Verifica se ocorreu um erro e se o código do erro é específico para um token CSRF inválido.
      return res.render("includes/404"); // Se o token for inválido, renderiza uma página de erro 404.
    }
    next(err); // Se não for um erro de CSRF, passa o erro para o próximo middleware de tratamento de erros.
  },

  csrfMiddleware: (req, res, next) => { // Middleware para gerar e disponibilizar o token CSRF.
    res.locals.csrfToken = req.csrfToken(); // Gera um novo token CSRF e o torna disponível para as visualizações como 'csrfToken'.
    next(); // Chama a próxima função de middleware.
  },

  flashMiddleware: (req, res, next) => { // Middleware para lidar com mensagens flash (mensagens temporárias).
    res.locals.errors = req.flash("errors"); // Obtém as mensagens flash de erro e as torna disponíveis para as visualizações como 'errors'.
    res.locals.success = req.flash("success"); // Obtém as mensagens flash de sucesso e as torna disponíveis para as visualizações como 'success'.
    next(); // Chama a próxima função de middleware.
  },
};
```

## `src/models/HomeModel.js`

```javascript
import mongoose from "mongoose"; // Importa a biblioteca mongoose para interagir com o banco de dados MongoDB.

const HomeSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para a página inicial.
  titulo: { type: String, required: true }, // Define o campo 'titulo' como uma string obrigatória.
  descricao: String, // Define o campo 'descricao' como uma string.
});
const HomeModel = mongoose.model("home", HomeSchema); // Cria um modelo (Model) do mongoose chamado "home" com base no HomeSchema.


export default HomeModel; // Exporta o modelo HomeModel para que ele possa ser usado em outros arquivos.
```

## `src/models/LoginModel.js`

```javascript
import mongoose from "mongoose"; // Importa a biblioteca mongoose para interagir com o banco de dados MongoDB.
import validator from "validator"; // Importa a biblioteca validator para validar dados, como e-mails.
import bcryptjs from "bcryptjs"; // Importa a biblioteca bcryptjs para comparar senhas criptografadas.

const LoginSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para o login.
  email: { type: String, required: true }, // Define o campo 'email' como uma string obrigatória.
  password: { type: String, required: true }, // Define o campo 'password' como uma string obrigatória.
});

const LoginModel = mongoose.model("Login", LoginSchema); // Cria um modelo (Model) do mongoose chamado "Login" com base no LoginSchema.

class Login { // Define a classe Login, que contém a lógica para autenticar um usuário.
  constructor(body) { // O construtor da classe, que é chamado quando um novo objeto Login é criado.
    this.body = body; // Armazena os dados do formulário (corpo da requisição) na propriedade 'body'.
    this.errors = []; // Inicializa um array para armazenar mensagens de erro.
    this.user = null; // Inicializa a propriedade 'user' como nula. Ela armazenará os dados do usuário se o login for bem-sucedido.
  }

  async login() { // Método assíncrono para realizar o login.
    this.validate(); // Chama o método de validação para verificar os dados do formulário.
    if (this.errors.length > 0) return; // Se houver erros de validação, interrompe o processo de login.
    this.user = await LoginModel.findOne({ email: this.body.email }); // Procura por um usuário no banco de dados com o e-mail fornecido.

    if (!this.user) { // Se nenhum usuário for encontrado com o e-mail fornecido.
      this.errors.push("Usuário ou senha inválidos."); // Adiciona uma mensagem de erro genérica para não revelar qual campo está incorreto.
      return; // Interrompe o processo de login.
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) { // Compara a senha fornecida com a senha criptografada armazenada no banco de dados.
      this.errors.push("Senha inválida."); // Se as senhas não corresponderem, adiciona uma mensagem de erro.
      this.user = null; // Define o usuário como nulo, pois o login falhou.
      return; // Interrompe o processo de login.
    }
  }

  validate() { // Método para validar os dados do formulário de login.
    this.cleanUp(); // Chama o método para limpar os dados do formulário.
    if (!validator.isEmail(this.body.email)) // Verifica se o e-mail fornecido é um e-mail válido.
      this.errors.push("E-mail inválido."); // Se o e-mail for inválido, adiciona uma mensagem de erro.
    if (this.body.password.length < 3 || this.body.password.length > 50) { // Verifica se a senha tem entre 3 e 50 caracteres.
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres."); // Se a senha não atender aos requisitos, adiciona uma mensagem de erro.
    }
  }

  cleanUp() { // Método para limpar os dados do formulário.
    for (const key in this.body) { // Itera sobre todas as chaves (campos) no corpo da requisição.
      if (typeof this.body[key] !== "string") { // Verifica se o valor de um campo não é uma string.
        this.body[key] = ""; // Se não for uma string, define o valor como uma string vazia.
      }
    }
    this.body = { // Garante que o corpo da requisição contenha apenas os campos de e-mail e senha.
      email: this.body.email, // Mantém o campo de e-mail.
      password: this.body.password, // Mantém o campo de senha.
    };
  }
}

export default Login; // Exporta a classe Login para que ela possa ser usada em outros arquivos.
```

## `src/models/RegisterModel.js`

```javascript
import mongoose from "mongoose"; // Importa a biblioteca mongoose, que facilita a interação com o banco de dados MongoDB.
import validator from "validator";  // Importa a biblioteca validator, que fornece funções para validar strings, como e-mails.
import bcryptjs from "bcryptjs"; // Importa a biblioteca bcryptjs, usada para criptografar senhas de forma segura.

const RegisterSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para definir a estrutura dos dados de registro.
  email: { type: String, required: true }, // Define o campo 'email' como uma string obrigatória.
  password: { type: String, required: true }, // Define o campo 'password' como uma string obrigatória.
});

const RegisterModel = mongoose.model("User", RegisterSchema); // Cria um modelo (Model) do mongoose chamado "User" com base no RegisterSchema, permitindo a manipulação dos dados no banco de dados.

class Register { // Define a classe Register, que encapsula a lógica de registro de um novo usuário.
  constructor(body) { // O construtor da classe, que é chamado quando um novo objeto Register é criado.
    this.body = body; // Armazena os dados do formulário (corpo da requisição) na propriedade 'body'.
    this.errors = []; // Inicializa um array para armazenar mensagens de erro de validação.
    this.user = null; // Inicializa a propriedade 'user' como nula. Ela armazenará o usuário após o registro.
  }

  async register() { // Método assíncrono para registrar um novo usuário.
    this.validate(); // Chama o método de validação para verificar os dados do formulário.
    if (this.errors.length > 0) return; // Se houver erros de validação, interrompe o processo de registro.

    await this.userExists(); // Chama o método para verificar se o usuário já existe no banco de dados.
    if (this.errors.length > 0) return; // Se o usuário já existir, interrompe o processo de registro.

    const salt = bcryptjs.genSaltSync(); // Gera um "sal" (um valor aleatório) para ser usado na criptografia da senha.
    this.body.password = bcryptjs.hashSync(this.body.password, salt); // Criptografa a senha do usuário usando o "sal" gerado.
    this.user = await RegisterModel.create(this.body); // Cria um novo usuário no banco de dados com os dados do formulário.
  }

  async userExists() { // Método assíncrono para verificar se um usuário com o mesmo e-mail já existe.
    const user = await RegisterModel.findOne({ email: this.body.email }); // Procura por um usuário no banco de dados com o mesmo e-mail.
    if (user) this.errors.push("Usuário já existe."); // Se encontrar um usuário, adiciona uma mensagem de erro ao array de erros.
  }

  validate() { // Método para validar os dados do formulário.
    this.cleanUp(); // Chama o método para limpar e normalizar os dados do formulário.
    if (!validator.isEmail(this.body.email)) // Verifica se o e-mail fornecido é um e-mail válido.
      this.errors.push("E-mail inválido."); // Se o e-mail for inválido, adiciona uma mensagem de erro.
    if (this.body.password.length < 3 || this.body.password.length > 50) { // Verifica se a senha tem entre 3 e 50 caracteres.
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres."); // Se a senha não atender aos requisitos, adiciona uma mensagem de erro.
    }
  }

  cleanUp() { // Método para limpar os dados do formulário.
    for (const key in this.body) { // Itera sobre todas as chaves (campos) no corpo da requisição.
      if (typeof this.body[key] !== "string") { // Verifica se o valor de um campo não é uma string.
        this.body[key] = ""; // Se não for uma string, define o valor como uma string vazia.
      }
    }
    this.body = { // Garante que o corpo da requisição contenha apenas os campos de e-mail e senha.
      email: this.body.email, // Mantém o campo de e-mail.
      password: this.body.password, // Mantém o campo de senha.
    };
  }
}

export default Register; // Exporta a classe Register para que ela possa ser usada em outros arquivos.
```