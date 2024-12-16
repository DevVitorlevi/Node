const express = require('express')
const app = express()
//ler o body
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
//
const path = require('path')

const BasePath = path.resolve(__dirname,'html')

app.get('/users/add',(req,res)=>{
    res.sendFile(`${BasePath}/form.html`)
})

app.post('/users/save',(req,res)=>{
        console.log(req.body)
    const nome = req.body.nome
    const idade = req.body.idade
    res.sendFile(`${BasePath}/form.html`)
    console.log(`O Nome do Usuário è ${nome} e sua Idade é ${idade}`)
})

app.listen(8080,()=>{
    console.log('Servidor Rodando')
})