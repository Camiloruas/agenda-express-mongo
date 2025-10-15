import mongoose from "mongoose"; // Importa a biblioteca mongoose para interagir com o banco de dados MongoDB.
import validator from "validator"; // Importa a biblioteca validator para validar dados, como e-mails.
import bcryptjs from "bcryptjs"; // Importa a biblioteca bcryptjs para comparar senhas criptografadas.

const LoginSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para o login.
  email: { type: String, required: true }, // Define o campo 'email' como uma string obrigatória.
  password: { type: String, required: true }, // Define o campo 'password' como uma string obrigatória.
});

const LoginModel = mongoose.models.User || mongoose.model("User", LoginSchema); // Cria um modelo (Model) do mongoose chamado "User" com base no LoginSchema.

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
      this.errors.push("Usuário não cadastrado."); // Adiciona uma mensagem de erro genérica para não revelar qual campo está incorreto.
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
