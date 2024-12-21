// Importa o módulo Express para criar o servidor
const express = require('express')

// Importa o módulo express-handlebars para renderizar templates
const exphbs = require('express-handlebars')

// Inicializa o aplicativo Express
const app = express()

// Configura o motor de visualização (template engine) como handlebars
app.engine('handlebars', exphbs.engine()) // Define o 'engine' do express como o handlebars
app.set('view engine', 'handlebars') // Define o 'view engine' para usar arquivos .handlebars

// Define uma rota GET para "/dashboard"
app.get('/dashboard', (req, res) => {
    // Renderiza a página "dashboard.handlebars"
    res.render('dashboard')
})

// Define uma rota GET para a raiz "/"
app.get('/', (req, res) => {
    // Cria um objeto User com informações fictícias
    const User = {
        name: 'Vitor', // Nome do usuário
        age: 16,       // Idade do usuário
        city: 'icapui-ce' // Cidade do usuário
    }
    
    // Define uma variável de autenticação
    const auth = false // Indica que o usuário está autenticado

    // Renderiza a página "home.handlebars" com os dados do usuário e a autenticação
    res.render("home", { user: User, auth })
})

app.get('/post',(req,res)=>{
    const post = {
        title:'Portifolio',
        techs:['HTML','CSS','JS','NODE.JS','MYSQL','REACT','JAVA'],
        me:'Dev Fullstack, Técnico em Desenvolvimento de Sistemas, Formado em Ciencia da Computação'
    }
    res.render('Portifolio', {post})

})

// Configura o servidor para escutar na porta 5000
app.listen(5000, () => {
    // Mensagem de confirmação no terminal quando o servidor está ativo
    console.log('Servidor Rodando')
})
