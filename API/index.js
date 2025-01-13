const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.get('/', (req,res)=>{
    res.json({message:'Olá Mundo'})
})
app.post('/criarproduto', (req,res)=>{
    const name = req.body.name
    const price = req.body.price

    res.json({message:`O produto ${name} foi criado com sucesso`})

})

app.listen(3000,()=>{
    console.log('Conectado')
})