import mongoose from "mongoose"; // Importa a biblioteca mongoose para interagir com o banco de dados MongoDB.

const HomeSchema = new mongoose.Schema({ // Cria um novo esquema (Schema) do mongoose para a página inicial.
  titulo: { type: String, required: true }, // Define o campo 'titulo' como uma string obrigatória.
  descricao: String, // Define o campo 'descricao' como uma string.
});
const HomeModel = mongoose.model("home", HomeSchema); // Cria um modelo (Model) do mongoose chamado "home" com base no HomeSchema.


export default HomeModel; // Exporta o modelo HomeModel para que ele possa ser usado em outros arquivos.
