const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => {
        console.log('Conectado')
    })
    .catch(err => {
        console.log('Falha Ao Conectar' + err)
    })
//const sequelize = new Sequelize('nome_bd','user','password',{host:'local_bd',dialect:'tipo_bd'})
//.then():quando um evento acontecer
//.catch(err):quando estiver um erro
//sequelize.authenticate():Verificar a Conexão