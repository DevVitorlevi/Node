const Produto = require('../models/Produto')

module.exports = class ProdutosController {
    static async todosProdutos(req,res){
        res.render('produtos/home')
    }
}