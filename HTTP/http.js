var http = require('http')//importando o metodo http

http.createServer(function (req, res) {
    res.end('Hello World, this my first server')
}).listen(8081);

console.log("Server Running")
//CreateServer è uma Função para Criar O servidor que recebe 2 paramentros req=requisição res=resposta
//end() é para enviar uma mensagem
//listen define a porta na qual seu servidor irá abrir