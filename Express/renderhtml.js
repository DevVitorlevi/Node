const express = require('express')
const app=express()
//const porta = 8081

const path = require('path')

const Basepath = path.join(__dirname,'html')

app.get('/main',(req,res)=>{

    res.sendFile(`${Basepath}/index.html`)
    //res.send('OPA')
})


app.listen(8082,()=>{
    console.log('Servidor Rodando')
})