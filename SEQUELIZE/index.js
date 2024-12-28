
const express = require('express');

// Importa o módulo express-handlebars, que permite o uso de templates Handlebars para renderizar páginas HTML
const exphbs = require('express-handlebars');

// Importa o módulo mysql2, utilizado para se conectar e interagir com o banco de dados MySQL

const conn = require('./db/conn.js')

const User = require('./models/User.js')

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
app.get('/users/create',(req,res)=>{
    res.render("adduser")
})

// Sincroniza o banco de dados usando o método `sync` do Sequelize.
// `conn` é a conexão do Sequelize importada de '../db/conn'.
conn.sync() 
    .then(() => {
        app.listen(4000, () => {
            console.log('Servidor rodando em http://localhost:4000'); // Mensagem de confirmação.
        });
    })
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err)); // Mensagem de erro mais detalhada.

