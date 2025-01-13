const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).json({message:'Olá Mundo'})
})
app.post('/criarproduto', (req,res)=>{
    const name = req.body.name
    const price = req.body.price

    res.status(201).json({message:`O produto ${name} foi criado com sucesso`})

})

app.listen(3000,()=>{
    console.log('Conectado')
})