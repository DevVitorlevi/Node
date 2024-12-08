// Importação de Módulos Externos
const chalk = require('chalk'); 
const inquirer = require('inquirer'); 

// Importação de Módulos Internos
const fs = require('fs'); // Biblioteca para manipulação de arquivos no sistema.

// Função Principal
operacao();

function operacao() {
    inquirer.prompt([{
        type: 'list', // Tipo de interação: uma lista de opções.
        name: 'operacao', // Nome da variável onde o valor da escolha será armazenado.
        message: 'Escolha uma operação:', // Mensagem exibida no terminal.
        choices: ['Criar Conta', 'Consultar Saldo', 'Depositar', 'Sacar', 'Sair'] // Opções disponíveis para o usuário.
    }])
    .then(resposta => {
        // Captura da resposta escolhida pelo usuário
        const acao = resposta.operacao; // Armazena a opção selecionada.
        console.log(acao); // Exibe a opção no terminal (para teste).
    })
    .catch(err => {
        // Tratamento de erros em caso de falhas
        console.error(err); // Exibe o erro no console.
    });
}
