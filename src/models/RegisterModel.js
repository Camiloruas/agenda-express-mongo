import mongoose from "mongoose"; // Importa a biblioteca mongoose, que facilita a interação com o banco de dados MongoDB.
import validator from "validator";  // Importa a biblioteca validator, que fornece funções para validar strings, como e-mails.
import bcryptjs from "bcryptjs"; // Importa a biblioteca bcryptjs, usada para criptografar senhas de forma segura.

const RegisterSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para definir a estrutura dos dados de registro.
  email: { type: String, required: true }, // Define o campo 'email' como uma string obrigatória.
  password: { type: String, required: true }, // Define o campo 'password' como uma string obrigatória.
});

const RegisterModel = mongoose.models.User || mongoose.model("User", RegisterSchema); // Cria um modelo (Model) do mongoose chamado "User" com base no RegisterSchema, permitindo a manipulação dos dados no banco de dados.

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
