// Importando o módulo 'express' que ajuda a criar o servidor HTTP
const express = require('express')
// Criando uma instância do servidor Express
const app = express()

// Importando o módulo 'path' que ajuda a manipular caminhos de arquivos e diretórios
const path = require('path')
// Definindo o caminho base para os arquivos HTML
const BasePath = path.join(__dirname, 'html')

// Rota que lida com requisições GET para o caminho '/users/:id'
// O ':id' é um parâmetro dinâmico que pode ser acessado em 'req.params.id'
app.get('/users/:id', (req, res) => {
    // Acessando o parâmetro 'id' da URL
    const id = req.params.id

    // Enviando o arquivo 'users.html' como resposta
    res.sendFile(`${BasePath}/users.html`)

    // Imprimindo no console que estamos buscando pelo usuário com o id fornecido
    console.log(`Estamos Buscando Pelo User: ${id}`)
})

// Rota que lida com requisições GET para o caminho '/main'
app.get('/main', (req, res) => {
    // Enviando o arquivo 'index.html' como resposta
    res.sendFile(`${BasePath}/index.html`)
})

// Iniciando o servidor na porta 8001
app.listen(8001, () => {
    // Imprimindo no console que o servidor está rodando
    console.log('Servidor Rodando')
})
