// Importação de Módulos Externos
const chalk = require('chalk'); 
const inquirer = require('inquirer'); 

// Importação de Módulos Internos
const fs = require('fs'); // Biblioteca para manipulação de arquivos no sistema.
const { Console } = require('console');

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
// Função para realizar um depósito em uma conta existente
function depositar() {
    // Pergunta ao usuário o nome da conta
    inquirer.prompt(
        [
            { name: 'NomeConta', message: 'Qual o Nome da Conta?' }
        ]
    ).then(resposta => {
        const NomeConta = resposta.NomeConta;

        // Verifica se a conta existe
        if (ContaExiste(NomeConta)) {
            // Pergunta ao usuário a quantia que deseja depositar
            inquirer.prompt(
                [
                    { name: 'Quantia', message: 'Quanto Você Deseja Depositar?' }
                ]
            ).then(resposta => {
                const Quantia = resposta.Quantia;

                // Adiciona a quantia ao saldo da conta
                AdicionarQuantia(NomeConta, Quantia);

                // Chama outra operação
                operacao();
            }).catch(er => console.log(er)); // Tratamento de erro para a entrada da quantia
        } else {
            // Se a conta não existir, chama novamente a função para tentar outro depósito
            depositar();
        }
    }).catch(err => console.log(err)); // Tratamento de erro para a entrada do nome da conta
}

//Função que Consulta saldo
function consultarSaldo(){
    inquirer.prompt([
        {name:'NomeConta',message:'Qual O Nome da Conta'}
    ]).then(resposta=>{
        const NomeConta = resposta.NomeConta

        if(ContaExiste(NomeConta)){
            const ContaDados = ObterDados(NomeConta)
            console.log(`O Seu Saldo Atual é: R$${ContaDados.saldo}`)
        }else{
            consultarSaldo()
        }
    operacao()
    }).catch(err=>console.log(err))
}
// Função para realizar o saque de uma conta
function sacar() {
    // Pergunta inicial solicitando o nome da conta
    inquirer.prompt([
        { name: 'NomeConta', message: 'Qual o Nome da Conta?' }
    ]).then(resposta => {
        const NomeConta = resposta.NomeConta; // Armazena o nome da conta fornecido pelo usuário

        // Verifica se a conta existe
        if (ContaExiste(NomeConta)) {
            // Caso a conta exista, pergunta quanto o usuário deseja sacar
            inquirer.prompt([
                { name: 'Quantia', message: 'Quanto Você Deseja Sacar?' }
            ]).then(resposta => {
                const Quantia = resposta.Quantia; // Armazena o valor a ser sacado fornecido pelo usuário

                // Função para realizar a retirada da quantia da conta
                RetirarQuantia(NomeConta, Quantia);

                // Após a operação de saque, retorna ao menu de operações
                operacao();
            }).catch(err => console.log(err)); // Trata erros na segunda entrada do usuário
        } else {
            // Caso a conta não exista, reinicia o processo de saque
            sacar();
        }
    }).catch(err => console.log(err)); // Trata erros na entrada inicial do usuário
}

// Função para verificar se a conta existe
function ContaExiste(NomeConta) {
    // Verifica se o arquivo JSON da conta existe no diretório "contas"
    if (fs.existsSync(`contas/${NomeConta}.json`)) {
        return true; // Retorna verdadeiro se a conta existir
    } else {
        // Mensagem de erro caso a conta não exista
        console.log(chalk.bgRed('Esta Conta Não Existe, Tente Novamente'));
        return false; // Retorna falso se a conta não existir
    }
}
// Função para adicionar uma quantia ao saldo da conta
function AdicionarQuantia(NomeConta, Quantia) {
    // Obtém os dados da conta (saldo atual e outras informações)
    const ContaDados = ObterDados(NomeConta);

    // Verifica se a quantia é válida
    if (!Quantia) {
        console.log(chalk.bgRedBright('Ocorreu Um Erro, Tente Novamente'));
        depositar(); // Reinicia o processo de depósito em caso de erro
    }

    // Atualiza o saldo da conta com a quantia depositada
    ContaDados.saldo = Number(Quantia) + Number(ContaDados.saldo);

    // Salva os novos dados da conta no arquivo JSON correspondente
    fs.writeFileSync(`contas/${NomeConta}.json`, JSON.stringify(ContaDados), err => console.log(err));

    // Exibe uma mensagem confirmando o depósito
    console.log(chalk.bgBlue(`Foi Depositado ${Quantia}`));
}

// Função para retirar uma quantia do saldo de uma conta
function RetirarQuantia(NomeConta, Quantia) {
    // Obtém os dados da conta com base no nome fornecido
    const ContaDados = ObterDados(NomeConta);

    // Verifica se a quantia é válida (não nula ou indefinida)
    if (!Quantia) {
        console.log(chalk.bgRedBright('Ocorreu Um ERRO, Tente Novamente')); // Mensagem de erro para entrada inválida
        return sacar(); // Retorna ao processo de saque
    }

    // Verifica se o saldo da conta é suficiente para realizar o saque
    if (ContaDados.saldo < Quantia) {
        console.log(chalk.bgRedBright('Valor Indisponível')); // Mensagem de erro para saldo insuficiente
        return sacar(); // Retorna ao processo de saque
    }

    // Atualiza o saldo da conta, subtraindo a quantia solicitada
    ContaDados.saldo = Number(ContaDados.saldo) - Number(Quantia);

    // Salva os novos dados da conta no arquivo JSON correspondente
    fs.writeFileSync(
        `contas/${NomeConta}.json`, 
        JSON.stringify(ContaDados), 
        err => console.log(err) // Trata possíveis erros ao salvar o arquivo
    );

    // Exibe uma mensagem confirmando que o saque foi realizado com sucesso
    console.log(chalk.bgBlue(`Foi Sacado R$${Quantia}`));
}


// Função para obter os dados de uma conta a partir de seu arquivo JSON
function ObterDados(NomeConta) {
    // Lê o conteúdo do arquivo JSON da conta
    const contaJSON = fs.readFileSync(`contas/${NomeConta}.json`, {
        encoding: 'utf8', // Define a codificação como UTF-8
        flag: 'r'        // Abre o arquivo no modo de leitura
    });

    // Retorna os dados da conta como um objeto JavaScript
    return JSON.parse(contaJSON);
}
