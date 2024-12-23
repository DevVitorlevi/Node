// Importa o módulo express, responsável por criar e gerenciar o servidor web
const express = require('express');

// Importa o módulo express-handlebars, que permite o uso de templates Handlebars para renderizar páginas HTML
const exphbs = require('express-handlebars');

// Importa o módulo mysql2, utilizado para se conectar e interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Cria uma instância da aplicação Express
const app = express();

// Configura o Handlebars como o motor de templates do Express
// O 'handlebars' é o motor que renderiza os templates, usando o método engine()
app.engine('handlebars', exphbs.engine()); // Define que a extensão '.handlebars' será usada com o Handlebars
app.set('view engine', 'handlebars'); // Informa ao Express que usará 'handlebars' como view engine

// Configura o Express para servir arquivos estáticos (CSS, imagens, JS) da pasta 'public'
app.use(express.static('public')); // Torna a pasta 'public' acessível para arquivos estáticos

// Middleware que permite ao Express processar dados enviados em formato URL-encoded (ex.: de formulários)
app.use(express.urlencoded({
    extended: true // Permite interpretar dados complexos (ex.: objetos ou arrays aninhados)
}));

// Middleware que permite ao Express processar dados em formato JSON, caso o cliente envie dados JSON
app.use(express.json()); 

// Rota para a página inicial, renderiza o template 'home.handlebars'
app.get('/', (req, res) => {
    res.render('home'); // Renderiza a página inicial usando o template 'home'
});

// Rota para inserir um novo livro no banco de dados
app.post('/livros/inserir', (req, res) => {
    // Captura os dados enviados pelo formulário no corpo da requisição
    const titulo = req.body.titulo; // Título do livro
    const qntpagina = req.body.paginas; // Quantidade de páginas do livro

    // Consulta SQL para inserir os dados na tabela 'livros'
    const consulta = `INSERT INTO livros (titulo, paginas) VALUES (?, ?)`; // Utiliza placeholders (?) para evitar SQL Injection

    // Executa a consulta no banco de dados, passando os valores obtidos do formulário
    conn.query(consulta, [titulo, qntpagina], (err) => {
        if (err) {
            // Caso ocorra um erro na consulta, exibe no console
            console.error('Erro ao inserir dados:', err.message);
            return; // Interrompe a execução se houver erro
        } else {
            // Se o livro for inserido com sucesso, exibe uma mensagem no console
            console.log('Livro inserido com sucesso!');
        }
        res.redirect('/'); // Redireciona o usuário para a página inicial após a inserção
    });
});

// Rota para listar todos os livros cadastrados
app.get('/livros', (req, res) => {
    const consulta = 'SELECT * FROM livros'; // Consulta SQL para buscar todos os livros

    // Executa a consulta no banco de dados
    conn.query(consulta, (err, data) => {
        if (err) {
            // Caso haja erro na consulta, exibe no console
            console.error('Erro ao buscar livros:', err);
            return; // Interrompe a execução se houver erro
        }

        const Livros = data; // Armazena o resultado da consulta na variável 'Livros'

        res.render('livros', { Livros }); // Renderiza a página 'livros.handlebars' e passa a lista de livros para o template
    });
});

// Rota para exibir os detalhes de um livro específico
app.get('/livro/:id', (req, res) => {
    const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
    const consulta = `SELECT * FROM livros WHERE id = ?`; // Consulta SQL para buscar um livro pelo ID

    // Executa a consulta no banco de dados, passando o ID como parâmetro
    conn.query(consulta, [id], (err, data) => {
        if (err) {
            // Caso ocorra um erro na consulta, exibe no console
            console.error(err);
            return; // Interrompe a execução se houver erro
        }

        const livro = data[0]; // Como a consulta retorna um array, pegamos o primeiro item, que é o livro encontrado

        res.render('livro', { livro }); // Renderiza a página 'livro.handlebars' e passa os dados do livro para o template
    });
});

// Rota GET para carregar o formulário de edição de um livro
app.get('/livro/edit/:id', (req, res) => {
    const id = req.params.id; // Obtém o ID do livro a partir dos parâmetros da URL
    const consulta = `SELECT * FROM livros WHERE id =?`; // Consulta SQL para buscar o livro pelo ID

    // Executa a consulta no banco de dados, passando o ID como parâmetro
    conn.query(consulta, [id], (err, data) => {
        if (err) {
            console.error(err); // Loga o erro no console, caso ocorra
            return; // Interrompe a execução em caso de erro
        }
        
        const livro = data[0]; // Obtém o primeiro (e único) resultado da consulta

        // Renderiza a página de edição, passando o objeto `livro` como dado
        res.render('edit', { livro });
    });
});

// Rota POST para salvar as alterações de um livro
app.post('/livro/updatelivro', (req, res) => {
    const id = req.body.id; // Obtém o ID do livro enviado pelo formulário
    const titulo = req.body.titulo; // Obtém o título atualizado enviado pelo formulário
    const qntpagina = req.body.paginas; // Obtém o número de páginas atualizado enviado pelo formulário

    // Consulta SQL para atualizar o título e o número de páginas de um livro pelo ID
    const consulta = `UPDATE livros SET titulo = ?, paginas = ? WHERE id = ?`;

    // Executa a consulta no banco de dados, passando os novos valores e o ID como parâmetros
    conn.query(consulta, [titulo, qntpagina, id], (err) => {
        if (err) {
            console.error('Erro ao editar livro: ' + err); // Loga o erro no console, caso ocorra
            return; // Interrompe a execução em caso de erro
        }

        console.log('Livro editado'); // Exibe uma mensagem no console ao editar com sucesso
        res.redirect('/livros'); // Redireciona para a lista de livros após a edição
    });
});


// Cria a conexão com o banco de dados MySQL
const conn = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL (geralmente localhost)
    user: 'root', // Usuário do banco de dados (no caso, 'root')
    password: '', // Senha do usuário (em branco neste caso)
    database: 'nodemysql' // Nome do banco de dados a ser utilizado
});

// Conecta ao banco de dados e, se a conexão for bem-sucedida, inicia o servidor
conn.connect(() => {
    try {
        console.log('Conectado ao Banco'); // Exibe no console que a conexão foi bem-sucedida
        app.listen(3000, () => { // Inicia o servidor Express na porta 3000
            console.log('Servidor rodando na porta 3000');
        });
    } catch (err) {
        // Caso ocorra algum erro ao conectar ao banco ou iniciar o servidor, exibe o erro no console
        throw new Error(console.log(err));
    }
});
