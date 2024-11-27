const express = require("express")
const app = express()

app.get('/main', (req, res) => {
    res.send('Welcome To My Website')
})

app.get('/blog', (req, res) => {
    res.send('This my blog')
})

app.get('/ola/:nome/:profissao/:cor', (req, res) => {
    res.send(`<h1>Olá ${req.params.nome} sua Profissão è ${req.params.profissao} e sua Cor Favorita É ${req.params.cor}`)
})
app.listen(8081, () => {
    console.log('Server Running at URL https://localhost:8081')
})
//listen sempre sera a ultimad