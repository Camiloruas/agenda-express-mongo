# Prompts Utilizados

Este arquivo armazena os prompts que foram utilizados para gerar a documentação e os comentários do projeto.

## Prompt 1: Adicionar Comentários ao Código

```
Eu preciso que você acesse cada arquivo .js dentro da pasta src e adicione comentários em cada linha deste código explicando o que aquela sintaxe está fazendo de forma bem intuitiva para que eu possa entender , vou descrever aqui um modelo que você vai seguir:
  validate() {  // esta linha está criando um ... você vai explicar da melhor forma possivel.
    this.cleanUp(); // está linha está chamando a função... explique da melhor forma
    if (!validator.isEmail(this.body.email)) // condição para verificar se o email.... explique de forma facil
      this.errors.push("E-mail inválido."); // explicar o que esta linha está fazendo ....
    if (this.body.password.length < 3 || this.body.password.length > 50) { // explicar o que esta linha está fazendo ....
      this.errors.push("A senha precisa ter entre 3 e 50 caracteres."); // explicar o que esta linha está fazendo ....
    }
  }
```

## Prompt 2: Criar Arquivos de Documentação (Versão Corrigida e Melhorada)

```
Agora, preciso que você faça duas coisas:

1.  Crie um arquivo md, que explique a estrutura do projeto. Quero que você detalhe a funcionalidade de cada diretório dentro da pasta `src`, explicando como cada um é usado e por quem, de uma forma que seja fácil de entender.

2.  Crie um segundo arquivo  que contenha todo o código-fonte dos arquivos `.js` que foram comentados anteriomente, consolidados em um único documento. O objetivo é que eu possa transferir este arquivo para o meu tablet para estudar.
```
