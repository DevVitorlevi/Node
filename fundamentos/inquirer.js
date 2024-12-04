
const chalk = require('chalk');

const inquirer = require('inquirer');

// Inicia o processo de perguntas ao usuário
inquirer
    .prompt([
        { name: 'n1', message: 'Nota do 1º Bimestre' }, // Pergunta a nota do 1º bimestre
        { name: 'n2', message: 'Nota do 2º Bimestre' }, // Pergunta a nota do 2º bimestre
        { name: 'n3', message: 'Nota do 3º Bimestre' }, // Pergunta a nota do 3º bimestre
        { name: 'n4', message: 'Nota do 4º Bimestre' }  // Pergunta a nota do 4º bimestre
    ])
    .then(res => {  // Após coletar as respostas, executa esta função
        // Converte as respostas para números e calcula a média das quatro notas
        let media = (Number(res.n1) + Number(res.n2) + Number(res.n3) + Number(res.n4)) / 4;

        if (media >= 6) {
            // Exibe mensagem de aprovação com fundo verde e formatação da média com uma casa decimal
            console.log(chalk.green(`Quem repete é gago, vem próximo ano. Média: ${media.toFixed(1)}`));
        } else {
            // Exibe mensagem de reprovação com fundo vermelho e a média formatada
            console.log(chalk.red(`Quem passa direto é trem, vem recuperação. Média: ${media.toFixed(1)}`));
        }
    })
    // Captura e exibe qualquer erro que possa ocorrer durante o processo
    .catch(err => console.log('Erro: ' + err));