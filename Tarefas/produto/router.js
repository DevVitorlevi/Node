const express = require('express')
const router = express.Router()
const Path = require('path')
const BasePath = Path.join(__dirname,'../template')
const fs = require('fs')

router.get('/add',(req,res)=>{
    res.sendFile(`${BasePath}/add.html`)
})
router.post('/save',(req,res)=>{
    if(!fs.existsSync('Estoque')){
        fs.mkdirSync('Estoque')
    }  
    const Produto = req.body.produto
    const Quant = req.body.qntProduto

    fs.writeFileSync(`Estoque/${Produto}.json`, JSON.stringify({name:Produto,quant:Quant}),(e)=>{console.log(e)})

    res.sendFile(`${BasePath}/add.html`)
})

module.exports = router