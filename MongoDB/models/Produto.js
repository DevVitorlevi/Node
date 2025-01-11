const conn = require('../db/conn')

const {ObjectId} = require('mongodb')
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
    static async getProdutoByID(id){
            const produto = await conn.db().collection('produtos').findOne({_id: new ObjectId(id)})
            return produto
    }
}

module.exports = Produto