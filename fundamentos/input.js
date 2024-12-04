//cria uma interface para entrada e saída de dados no terminal
const readline = require('readline').createInterface({
    input: process.stdin,   // Define a entrada de dados como o terminal
    output: process.stdout  // Define a saída de dados como o terminal
})

const chalk = require('chalk')

// Pergunta ao usuário qual é a sua média
readline.question('Qual Sua Média? ', media => {
    if (media >= 6) {

        console.log(chalk.bgGreen(`Sua Média Foi: ${media} Você Está Aprovado!!!`))
    } else {

        console.log(chalk.bgRed(`Sua Média Foi: ${media} Você Está Reprovado`))
    }

    // Encerra a interface readline, liberando o terminal
    readline.close()
})