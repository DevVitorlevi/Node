const conn = require('../db/conn')

class Produto {
    constructor(nome,image,preco,descricao){
        this.nome = nome
        this.image= image
        this.preco = preco
        this.descricao = descricao
    }

    save(){
        const produto = conn.db().collection('produtos').insertOne({
            nome:this.nome,
            image:this.image,
            preco:this.preco,
            descricao:this.descricao
        })
        return produto
    }

    static getProdutos(){
        const produtos = conn.db().collection('produtos').find().toArray()

        return produtos
    }
}

module.exports = Produto