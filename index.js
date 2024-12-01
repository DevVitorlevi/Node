// Importa a biblioteca 'minimist', que facilita a análise de argumentos passados pela linha de comando
const minimist = require('minimist');

// Captura os argumentos da linha de comando, ignorando os dois primeiros elementos (node e nome do script)
const args = minimist(process.argv.slice(2));

// Extrai o valor do argumento '--nome' e armazena na variável 'nome'
const nome = args['nome'];
// Extrai o valor do argumento '--sobrenome' e armazena na variável 'sobrenome'
const sobrenome = args['sobrenome']

// Extrai o valor do argumento '--Profissao' e armazena na variável 'Profissao'
const Profissao = args['Profissao'];

// Imprime uma mensagem formatada com os valores das variáveis 'nome' e 'Profissao'
console.log(`O nome dele é ${nome} ${sobrenome} e sua profissão é ${Profissao}`);
