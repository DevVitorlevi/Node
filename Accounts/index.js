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
        switch(acao){

            case 'Criar Conta':
                criarConta();
                break;

            case 'Consultar Saldo':
                consultarSaldo();
                break;

            case 'Depositar':
                depositar();
                break;

            case 'Sacar':
                sacar();
                break;

            case 'Sair':
                console.log(chalk.green('Saindo do Sistema...'));
                process.exit();
            default:
                console.log(chalk.red('Opção Inválida!'));
                operacao(); // Chama a função novamente caso a opção seja inválida.
        }
    })
    .catch(err => {
        // Tratamento de erros em caso de falhas
        console.error(err); // Exibe o erro no console.
    }); 
}
// Função para criar uma conta de banco
function criarConta() {
    console.log(chalk.bgGreenBright('Obrigado Por Escolher Nosso Banco !!!'));
    console.log(chalk.green('Defina As Opções a Seguir'));

    inquirer.prompt([
        {
            name: 'nome', 
            message: 'Qual o Nome Do Titular da Conta'
        }
    ])
    .then(res => { 
        const Nome = res.nome; 
        console.log(Nome); 
        console.log(chalk.green('Parabens, Sua Conta Foi Criada')); 

        // Verifica se a pasta 'contas' existe; se não, cria
        if (!fs.existsSync('contas')) {
            fs.mkdirSync('contas'); // Cria a pasta 'contas'
        }

        // Verifica se já existe um arquivo para o nome fornecido
        if (fs.existsSync(`contas/${Nome}.json`)) {
            // Se existir, avisa o usuário e reinicia o processo
            console.log(chalk.red('Já Existe Uma Conta Com Este Nome, Escolha Outro'));
            console.log('================================');
            criarConta(); // Chama a função novamente para pedir um nome diferente
            return; // Interrompe a execução da função atual
        }

        // Cria um arquivo JSON com o nome fornecido e inicializa o saldo como 0
        fs.writeFileSync(`contas/${Nome}.json`, JSON.stringify({ nome: Nome, saldo: 0 }));

    })
    .catch(err => { 
        console.error(err); 
    });
}

// Função Para Deposito

function depositar(){
    inquirer.prompt(
        [
            {name:'NomeConta',message:'Qual o Nome da Conta?'}
        ]
    ).then(resposta =>{
        const NomeConta = resposta.NomeConta

        if(ContaExiste(NomeConta)){
            
        }else{
            depositar()
        }
    })
    .catch(err=>console.log(err))
}
 //Verifica se a Conta existe 
function ContaExiste(NomeConta){
    
    if(fs.existsSync(`contas/${NomeConta}.json`)){
        return true;
    }else{
        console.log(chalk.bgRed('Esta Conta Não Existe, Tente Novamente'))
    return false;
    }
}
