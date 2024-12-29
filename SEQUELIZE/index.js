// Importa o módulo express para criar o servidor
const express = require('express');

// Importa o módulo express-handlebars para usar templates Handlebars
const exphbs = require('express-handlebars');

// Importa o módulo mysql2 para se conectar ao banco de dados MySQL
const conn = require('./db/conn.js');

// Importa os modelos User e Endereco para interagir com as tabelas no banco de dados
const User = require('./models/User.js');
const Endereco = require('./models/Endereço.js');

// Cria uma instância da aplicação Express
const app = express();

// Configura o Handlebars como o motor de templates do Express
app.engine('handlebars', exphbs.engine()); // Define que o Handlebars será usado
app.set('view engine', 'handlebars'); // Informa ao Express para usar o Handlebars como o motor de templates

// Configura o Express para servir arquivos estáticos (CSS, imagens, JS) da pasta 'public'
app.use(express.static('public'));

// Middleware para processar dados URL-encoded de formulários
app.use(express.urlencoded({ extended: true }));

// Middleware para processar dados JSON enviados em requisições
app.use(express.json());

// Rota para a página inicial, renderiza o template 'home.handlebars'
app.get('/', async (req, res) => {
    const users = await User.findAll({ raw: true }); // Consulta todos os usuários no banco
    res.render('home', { users }); // Renderiza o template 'home' passando os usuários como contexto
});

// Rota para exibir o formulário de criação de usuário
app.get('/users/create', (req, res) => {
    res.render('adduser');
});

// Rota para criar um novo usuário
app.post('/users/create', async (req, res) => {
    const { nome, profissao } = req.body;
    let newsletter = req.body.newsletter;

    // Verifica se o checkbox 'newsletter' foi marcado
    newsletter = newsletter === 'on';

    // Cria um novo usuário no banco de dados
    await User.create({
        name: nome,
        profissao: profissao,
        newsletter: newsletter
    }).then(() => {
        console.log('Usuário cadastrado');
    }).catch(err => {
        console.error(err);
    });

    // Redireciona para a página inicial após o cadastro
    res.redirect('/');
});

// Rota para exibir os detalhes de um usuário específico
app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ raw: true, where: { id } });
    res.render('user', { user }); // Renderiza o template 'user' com os dados do usuário
});

// Rota para apagar um usuário
app.post('/user/apagar/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({ where: { id } }); // Apaga o usuário pelo id
    res.redirect('/'); // Redireciona para a página inicial
});

// Rota para editar um usuário
app.get('/user/edit/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ include: Endereco, where: { id } });
    res.render('edit', { user: user.get({ plain: true }) }); // Renderiza o template 'edit' com os dados do usuário
});

// Rota para atualizar os dados de um usuário
app.post('/user/editar', async (req, res) => {
    const { id, nome, profissao } = req.body;
    let newsletter = req.body.newsletter;
    newsletter = newsletter === 'on';

    // Atualiza o usuário no banco de dados
    await User.update(
        { name: nome, profissao: profissao, newsletter: newsletter },
        { where: { id } }
    );

    // Redireciona para a página inicial após a atualização
    res.redirect('/');
});

// Rota para criar um novo endereço
app.post('/endereco/create', async (req, res) => {
    const { UserId, rua, number, city } = req.body;
    await Endereco.create({ UserId, rua, number, city });
    res.redirect('/'); // Redireciona para a página inicial após criar o endereço
});

// Rota para apagar um endereço
app.post('/endereco/apagar', async (req, res) => {
    const id = req.body.id;
    await Endereco.destroy({ where: { id } }); // Apaga o endereço pelo id
    res.redirect('/'); // Redireciona para a página inicial
});

// Sincroniza o banco de dados e inicia o servidor na porta 4000
conn.sync()
    .then(() => {
        app.listen(4000, () => {
            console.log('Servidor rodando em http://localhost:4000');
        });
    })
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));
