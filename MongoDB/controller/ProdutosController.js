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
    static async viewProduto(req,res){
        const id = req.params.id

        const produto = await Produto.getProdutoByID(id)

        res.render('produtos/produto', {produto})
    }
    static async removeProduto(req,res){
        const id = req.params.id
        await Produto.removeProduto(id)

        res.redirect('/produtos')
    }
    static async editProduto(req,res){
        const id = req.params.id

        const produto = await Produto.getProdutoByID(id)

        res.render('produtos/edit', {produto})
    }
    static async atualizarProduto(req,res){
        const id = req.body.id

        const {nome,image,preco,descricao} = req.body
        const data = new Produto(nome,image,preco,descricao)
        await data.atualizarProduto(id)
        res.redirect('/')
    }
}