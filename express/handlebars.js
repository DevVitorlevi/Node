const express = require('express')
const app = express()
const handlebars = require('express-handlebars')

//template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', ' handlebars')

//Conexão com O banco De dados 
const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemadecadastro', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})


app.listen(8081, () => {
    console.log('Server Running at URL https://localhost:8081')
})