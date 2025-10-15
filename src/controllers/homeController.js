export default { // Exporta um objeto com os métodos do controlador.
  index: async (req, res, next) => { // Método para lidar com a rota da página inicial.
    res.render("main"); // Renderiza (envia para o navegador) a página de visualização "main.ejs".
    return; // Encerra a execução do método.
  },
};