
const express = require('express');
const app = express();

// Importa o mecanismo de template `express-handlebars`.
// O `{ engine }` é desestruturado da biblioteca `express-handlebars`.
const { engine } = require('express-handlebars');
const Sequelize = require('sequelize');

// Importa o body-parser, um middleware que analisa os corpos das requisições HTTP.
// É útil para acessar os dados enviados em formulários.
const bodyParser = require('body-parser');

// Configuração do Template Engine Handlebars.
// Define o motor de templates chamado 'handlebars' e usa o layout padrão 'main'.
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');  // Define 'handlebars' como o mecanismo de visualização padrão.

const sequelize = new Sequelize('sistemadecadastro', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

// Configuração do Body Parser para processar dados do formulário.
// `urlencoded` analisa os dados enviados via formulários HTML.
// `extended: false` significa que apenas objetos simples serão analisados (sem aninhamento complexo).
app.use(bodyParser.urlencoded({ extended: false }));

// Configura o Body Parser para analisar dados em formato JSON.
app.use(bodyParser.json());


app.get('/cad', (req, res) => {
    res.render('form');  // Renderiza a view 'form.handlebars'.
});

// Essa rota recebe os dados do formulário enviados via POST.
app.post('/add', (req, res) => {
    // Envia uma resposta com os dados recebidos (título e conteúdo) do formulário.
    res.send(`Texto ${req.body.titulo} Conteúdo ${req.body.conteudo}`);
});

// Inicia o servidor na porta 8081.                
app.listen(8081, () => {
    console.log('Server Running at URL http://localhost:8081');  // Mensagem de confirmação do servidor.
});

