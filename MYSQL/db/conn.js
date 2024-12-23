// Importa o módulo `mysql2`, que permite a conexão e a interação com bancos de dados MySQL.
const mysql = require('mysql2');

// Cria um pool de conexões para gerenciar múltiplas conexões com o banco de dados simultaneamente.
// Isso melhora o desempenho em aplicativos que exigem várias conexões simultâneas.
const conn = mysql.createPool({
    connectionLimit: 10, // Define o número máximo de conexões simultâneas no pool.
    host: 'localhost',   // Especifica o endereço do servidor MySQL. Neste caso, é a máquina local.
    user: 'root',        // Nome do usuário utilizado para acessar o banco de dados.
    password: '',        // Senha para o usuário do banco de dados. Aqui está em branco (não recomendado para produção).
    database: 'nodemysql' // Nome do banco de dados ao qual o pool irá se conectar.
});

// Exporta o objeto `conn` para que possa ser utilizado em outros arquivos do projeto.
// Isso permite que outras partes do código façam consultas ao banco de dados usando o pool de conexões.
module.exports = conn;
