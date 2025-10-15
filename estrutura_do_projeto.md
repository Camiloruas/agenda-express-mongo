# Estrutura do Projeto

Este documento descreve a estrutura de diretórios do projeto, com foco na pasta `src` e no arquivo `routes.js`.

## `routes.js`

O arquivo `routes.js` é o coração do roteamento da sua aplicação. Ele atua como um mapa, direcionando as requisições que chegam do navegador para o controlador (Controller) correto. 

- **Quem usa?** O `server.js` (o arquivo principal do servidor) usa este arquivo para saber como lidar com as diferentes URLs que os usuários acessam.
- **Como funciona?** Para cada URL (por exemplo, `/login`, `/register`, `/`), o `routes.js` especifica qual função em qual arquivo de controlador deve ser executada.

## `src/`

A pasta `src` (abreviação de *source*, ou código-fonte) é onde a maior parte da lógica da sua aplicação reside. Ela é organizada nos seguintes subdiretórios:

### `src/controllers`

Os controladores são os "cérebros" da sua aplicação. Eles recebem as requisições que o `routes.js` direciona e decidem o que fazer a seguir.

- **Funcionalidade:** Um controlador pode, por exemplo, pegar os dados que um usuário enviou em um formulário, interagir com o banco de dados (através de um Model) e, finalmente, enviar uma página de volta para o navegador do usuário (uma View).
- **Exemplo:** O `loginController.js` lida com a lógica de login: ele verifica se o e-mail e a senha estão corretos e, em seguida, decide se o usuário pode entrar no sistema ou se deve ver uma mensagem de erro.

### `src/middlewares`

Middlewares são funções que atuam como "intermediários" no processamento de uma requisição. Eles são executados *entre* o momento em que a requisição chega e o momento em que ela é finalmente tratada pelo controlador.

- **Funcionalidade:** Eles são úteis para tarefas que precisam acontecer em quase todas as requisições, como verificar se um usuário está logado, tratar erros específicos ou disponibilizar variáveis globais para as suas visualizações.
- **Exemplo:** O `flashMiddleware` que criamos pega as mensagens de erro ou sucesso e as prepara para serem exibidas na página, não importa qual controlador seja chamado.

### `src/models`

Os modelos são responsáveis por interagir diretamente com o banco de dados. Eles definem a "forma" (ou esquema) dos seus dados e fornecem métodos para criar, ler, atualizar e deletar informações.

- **Funcionalidade:** Eles garantem que os dados salvos no banco de dados estejam no formato correto e também contêm a lógica de validação (por exemplo, garantir que um e-mail seja válido ou que uma senha tenha um número mínimo de caracteres).
- **Exemplo:** O `RegisterModel.js` define que um usuário precisa ter um `email` e uma `password`, e contém a lógica para verificar se um e-mail já existe no banco de dados antes de criar um novo usuário.

### `src/views`

As visualizações são os arquivos que geram o HTML que é enviado para o navegador do usuário. Elas são a "parte visual" da sua aplicação.

- **Funcionalidade:** Elas recebem os dados que o controlador envia e os utilizam para construir a página dinamicamente. Usamos a linguagem EJS (Embedded JavaScript) para inserir dados e lógica diretamente no HTML.
- **Exemplo:** O arquivo `register.ejs` contém o formulário de registro e também o código para exibir as mensagens de erro que o `registerController` envia quando a validação falha.
