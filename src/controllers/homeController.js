import Contact from "../models/ContactModel.js";

// Este arquivo é o controlador da página inicial.
// Ele define o que acontece quando um usuário acessa a rota principal ("/").
// Ele envia um formulário HTML para o navegador e também lida com o envio desse formulário.

export default { // Exporta um objeto com os métodos do controlador.
  index: async (req, res, next) => { // Método para lidar com a rota da página inicial.
    const contacts = await Contact.searchContacts();
    res.render("index", { contacts }); // Renderiza (envia para o navegador) a página de visualização "index.ejs".
    return; // Encerra a execução do método.
  },
};