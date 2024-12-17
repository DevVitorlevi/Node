// Importa o módulo 'express' e cria uma instância do aplicativo.
const express = require('express')
const app = express()

// Configura o middleware para ler o corpo das requisições.
// O express.urlencoded lida com dados do tipo 'application/x-www-form-urlencoded' (formulários tradicionais).
// O express.json lida com dados do tipo 'application/json'.
app.use(express.urlencoded({
    extended: true // Permite o uso de objetos aninhados nas requisições
}))
app.use(express.json()) // Permite que o servidor receba e entenda requisições JSON.

const path = require('path') // Importa o módulo 'path', utilizado para manipular caminhos de arquivos.

const BasePath = path.resolve(__dirname, 'html') // Define o caminho base onde os arquivos HTML estão localizados.


// Rota GET para exibir o formulário de adição de usuário.
// Quando um usuário acessar a URL '/users/add', o servidor vai responder com o arquivo 'form.html'.
app.get('/users/add', (req, res) => {
    res.sendFile(`${BasePath}/form.html`) // Envia o arquivo HTML com o formulário.
})

// Rota POST para salvar as informações do usuário.
// Quando o formulário for enviado via POST, os dados serão processados aqui.
app.post('/users/save', (req, res) => {
    console.log(req.body) // Exibe os dados recebidos no corpo da requisição no console.

    // Extrai os dados do corpo da requisição. 'nome' e 'idade' são os campos do formulário.
    const nome = req.body.nome
    const idade = req.body.idade

    // Responde ao cliente enviando de volta o arquivo 'form.html', provavelmente para permitir que ele preencha novamente.
    res.sendFile(`${BasePath}/form.html`)

    // Exibe as informações recebidas no console.
    console.log(`O Nome do Usuário é ${nome} e sua Idade é ${idade}`)
})

// Inicia o servidor na porta 8080 e exibe uma mensagem no console.
app.listen(8080, () => {
    console.log('Servidor Rodando') // Mensagem de confirmação que o servidor está ativo.
})
