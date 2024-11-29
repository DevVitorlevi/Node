const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})
const Post = sequelize.define('postagens', {
    titulo: { type: Sequelize.STRING },
    conteudo: { type: Sequelize.TEXT }
})

Post.create({
    titulo: 'teste',
    conteudo: 'isto é um teste'
})

const User = sequelize.define('user', {
    nome: { type: Sequelize.STRING },
    idade: { type: Sequelize.INTEGER },
    email: { type: Sequelize.STRING }
})

User.create({
    nome: 'Vitor Levi',
    idade: 20,
    email: 'teste@gmail.com'
})
