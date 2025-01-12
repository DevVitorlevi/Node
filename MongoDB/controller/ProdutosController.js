const Produto = require('../models/Produto')

module.exports = class ProdutosController {
    static async todosProdutos(req,res){
        res.render('produtos/home')
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

}