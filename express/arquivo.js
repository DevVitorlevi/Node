const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

app.listen(8080, () => {
    console.log("Servidor Rodando")
})
//sendFile é para enviar uma arquivo e __dirname é o nome do diretório que deve ser concatenado ao arquivo"