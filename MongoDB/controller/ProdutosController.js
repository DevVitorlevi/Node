const Produto = require('../models/Produto')

module.exports = class ProdutosController {
    static async todosProdutos(req,res){
        res.render('produtos/home')
    }
    static criarProduto(req,res){
        res.render('produtos/criar')
    }
    static async adicionarProduto(req,res){
        const {nome,preco,descricao} = req.body

        const produto = new Produto(nome,preco,descricao)

        produto.save()

        res.redirect('/')
    }
}