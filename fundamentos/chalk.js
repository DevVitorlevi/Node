const chalk = require('chalk');
const nota = 10;

if (nota >= 7) {
    // Fundo escuro e texto branco garantido
    console.log(chalk.green('Você Está Aprovado'));
} else {
    // Fundo vermelho brilhante para maior contraste
    console.log(chalk.bgRedBright.white('Você Está Reprovado'));
}
//Chalk Troca a propiadade da fote deiando ela de outra cor 