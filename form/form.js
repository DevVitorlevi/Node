const express = require('express');
const app = express();
const { engine } = require('express-handlebars');  // Importação correta
const Sequelize = require('sequelize');

// Template Engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));  // Usando o objeto engine
app.set('view engine', 'handlebars');  // Remove o espaço extra antes de 'handlebars'

// Conexão com o banco de dados
const sequelize = new Sequelize('sistemadecadastro', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

// Rotas
app.get('/cad', (req, res) => {
    res.render('form');
});

// Inicia o servidor
app.listen(8081, () => {
    console.log('Server Running at URL http://localhost:8081');  // Corrigido o protocolo https para http
});
