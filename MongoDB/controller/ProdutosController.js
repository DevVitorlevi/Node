const Produto = require('../models/Produto')

module.exports = class ProdutosController {
    static async todosProdutos(req,res){

        const produtos = await Produto.getProdutos()

        res.render('produtos/home', {produtos})
    }
    static criarProduto(req,res){
        res.render('produtos/criar')
    }
    static async adicionarProduto(req,res){
        const {nome,image,preco,descricao} = req.body

        const produto = new Produto(nome,image,preco,descricao)

        produto.save()

        res.redirect('/')
    }
}