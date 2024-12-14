const express = require('express')
const app = express()
const porta = 8080 

app.get('/main',(req,res)=>{
    res.send("Olá mundo")
})
app.listen(porta,()=>{
    console.log('Servidor rodando')
})