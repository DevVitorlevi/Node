const express = require('express')
const app = express()
const Path = require('path')
const BasePath = Path.resolve(__dirname,'template')
const produtos = require('./produto/router')

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use('/produto', produtos)
app.use(express.static('public'))

app.get('/main',(req,res)=>{
    res.sendFile(`${BasePath}/index.html`)
})
app.listen(5000,()=>{
    console.log('Servidor Rodando')
})