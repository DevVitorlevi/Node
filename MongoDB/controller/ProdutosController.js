const Produto = require('../models/Produto')

module.exports = class ProdutosController {
    static async todosProdutos(req,res){
        const TodosProdutos = await Produto.find().lean()

        res.render('produtos/home',{TodosProdutos})
    }
    static criarProduto(req,res){
        res.render('produtos/criar')
    }
    static async adicionarProduto(req, res) {
        // Extrai os campos 'nome', 'image', 'preco' e 'descricao' do corpo da requisição
        const { nome, image, preco, descricao } = req.body;
        
        // Cria uma nova instância do modelo 'Produto' com os dados recebidos
        const Produtos = new Produto({ nome, image, preco, descricao });
        
        // Salva o novo produto no banco de dados (operações de banco de dados são assíncronas)
        await Produtos.save();
        
        // Redireciona o cliente para a rota principal ('/')
        res.redirect('/');
    }  
    static async viewProduto(req,res){
        const id = req.params.id

        const produto = await Produto.findById(id).lean()

        res.render('produtos/produto', {produto})
    }
    static async editarProduto(req,res){
        const id = req.params.id

        const produto = await Produto.findById(id).lean()

        res.render('produtos/edit', {produto})
    }
    static async atualizarProduto(req,res){
        const id = req.body.id

        const { nome, image, preco, descricao } = req.body;

        const Data = { nome, image, preco, descricao }

        await Produto.updateOne({_id:id}, Data)

        res.redirect('/')
    }
    


}