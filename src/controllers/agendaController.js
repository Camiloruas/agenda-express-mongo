import Contact from "../models/ContactModel.js";

export default { // Exporta um objeto com os métodos do controlador.
  index: async (req, res, next) => { // Método para lidar com a rota da página inicial.
    const contacts = await Contact.searchContacts();
    res.render("index", { contacts }); // Renderiza (envia para o navegador) a página de visualização "index.ejs".
    return; // Encerra a execução do método.
  },
};