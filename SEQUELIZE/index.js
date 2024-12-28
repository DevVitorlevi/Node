
const express = require('express');

// Importa o módulo express-handlebars, que permite o uso de templates Handlebars para renderizar páginas HTML
const exphbs = require('express-handlebars');

// Importa o módulo mysql2, utilizado para se conectar e interagir com o banco de dados MySQL

const conn = require('./db/conn.js')

const User = require('./models/User.js');
const Endereço = require('./models/Endereço.js');


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
app.get('/', async(req, res) => {
    const users =  await User.findAll({raw:true})//findAll é para fazer a consulta e raw é para tranformar os dados em um array

    res.render('home',{users}); // Renderiza a página inicial usando o template 'home'
});
app.get('/users/create',(req,res)=>{
    res.render("adduser")
})
app.post('/users/create', async(req,res)=>{
    // Extrai os valores 'nome' e 'profissao' do corpo da requisição (dados enviados pelo formulário).
    const { nome, profissao } = req.body;

    // Captura o valor do campo 'newsletter' enviado pelo formulário.
    let newsletter = req.body.newsletter;

    // Verifica se o checkbox de newsletter foi marcado. 
    // Se estiver marcado ('on'), define como true; caso contrário, como false.
    if (newsletter === 'on') {
        newsletter = true; // Checkbox marcado
    } else {
        newsletter = false; // Checkbox não marcado
    }

    // Usa o método 'create' do Sequelize para inserir os dados no banco de dados.
    // Os campos 'name', 'profissao' e 'newsletter' da tabela 'User' são preenchidos.
    await User.create({
        name: nome,           // Define o campo 'name' no banco com o valor enviado no campo 'nome' do formulário.
        profissao: profissao, // Define o campo 'profissao' no banco com o valor enviado no campo 'profissao' do formulário.
        newsletter: newsletter // Define o campo 'newsletter' no banco com o valor booleano (true ou false).
    })
        .then(() => {
            // Exibe no console uma mensagem de sucesso ao cadastrar o usuário.
            console.log('Usuário cadastrado');
        })
        .catch(err => {
            // Caso ocorra um erro durante a criação do registro, exibe o erro no console.
            console.error(err);
        });

    // Redireciona o usuário para a página inicial após o cadastro ser concluído.
    res.redirect('/');

})
app.get('/user/:id',async (req,res)=>{
    const id = req.params.id

    const user = await User.findOne({raw:true,where:{id}})

    res.render('user',{user})
})
app.post('/user/apagar/:id', async (req,res)=>{
    const id = req.params.id
    await User.destroy({where:{id}})

    res.redirect('/')
})
app.get('/user/edit/:id', async(req,res)=>{
    const id = req.params.id
    const user = await User.findOne({raw:true,where:{id}})
    res.render('edit',{user})
})
app.post('/user/editar', async (req, res) => {
    // Extrai os valores 'id', 'nome', e 'profissao' do corpo da requisição.
    const { id, nome, profissao } = req.body;

    // Captura o valor do campo 'newsletter' enviado pelo formulário.
    let newsletter = req.body.newsletter;

    // Verifica se o checkbox de newsletter foi marcado.
    newsletter = newsletter === 'on';

    // Atualiza o registro no banco de dados.
    await User.update(
        {name: nome,profissao: profissao,newsletter: newsletter},{where: { id: id }}
    );

    // Redireciona para a página inicial após a atualização.
    res.redirect('/');
});


// Sincroniza o banco de dados usando o método `sync` do Sequelize.
// `conn` é a conexão do Sequelize importada de '../db/conn'.
conn.sync() 
    .then(() => {
        app.listen(4000, () => {
            console.log('Servidor rodando em http://localhost:4000'); // Mensagem de confirmação.
        });
    })
    .catch(err => console.error('Erro ao sincronizar o banco de dados:', err)); // Mensagem de erro mais detalhada.

