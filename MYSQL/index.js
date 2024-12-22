// Importa o módulo express, responsável por criar o servidor web
const express = require('express');

// Importa o módulo express-handlebars, usado para gerenciar templates e renderizar páginas HTML
const exphbs = require('express-handlebars');

// Importa o módulo mysql2, utilizado para conectar e interagir com o banco de dados MySQL
const mysql = require('mysql2');

// Cria uma instância da aplicação Express
const app = express();

// Configura o Handlebars como o mecanismo de renderização de views do Express
app.engine('handlebars', exphbs.engine()); // Define o 'engine' do express como o handlebars
app.set('view engine', 'handlebars'); // Define que o 'view engine' trabalhará com arquivos .handlebars

// Configura o Express para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Middleware para interpretar dados enviados no corpo da requisição em formato URL-encoded
app.use(express.urlencoded({
    extended: true // Permite interpretar dados aninhados (ex.: objetos ou arrays)
}));

// Middleware para interpretar dados enviados no corpo da requisição em formato JSON
app.use(express.json());

// Rota principal que renderiza a página inicial
app.get('/', (req, res) => {
    res.render('home'); // Renderiza a página 'home.handlebars'
});

// Rota para inserir um livro no banco de dados
app.post('/livros/inserir', (req, res) => {
    // Captura os valores enviados no formulário
    const titulo = req.body.titulo; // Título do livro
    const qntpagina = req.body.paginas; // Quantidade de páginas do livro

    // Consulta SQL para inserir os dados na tabela 'livros'
    const consulta = `INSERT INTO livros (titulo, paginas) VALUES (?, ?)`; // Utiliza placeholders (?) para prevenir SQL Injection

    // Executa a consulta no banco de dados, passando os valores do formulário
    conn.query(consulta, [titulo, qntpagina], (err) => {
        if (err) {
            console.error('Erro ao inserir dados:', err.message); // Exibe o erro no console, caso ocorra
            return
        } else {
            console.log('Livro inserido com sucesso!'); // Mensagem de sucesso no console
        }
        res.redirect('/'); // Redireciona o usuário para a página inicial após a inserção
    });
});

app.get('/livros',(req,res)=>{
    const consulta ='SELECT * FROM livros'
    conn.query(consulta,(err,data)=>{
        if(err){
            Console.error('Erro ao Buscar Livros'+ err)
            return
        }

        const Livros = data

        res.render('livros',{Livros})

    })
})

// Cria a conexão com o banco de dados MySQL
const conn = mysql.createConnection({
    host: 'localhost', // Endereço do servidor do banco de dados
    user: 'root', // Usuário para conexão (no caso, 'root')
    password: '', // Senha do usuário (neste exemplo, está em branco)
    database: 'nodemysql' // Nome do banco de dados a ser utilizado
});

// Conecta ao banco de dados e inicia o servidor
conn.connect(() => {
    try {
        console.log('Conectado ao Banco'); // Exibe no console que a conexão foi bem-sucedida
        app.listen(3000); // Inicia o servidor na porta 3000
    } catch (err) {
        throw new Error(console.log(err)); // Lança um erro caso algo dê errado na conexão ou no servidor
    }
});
