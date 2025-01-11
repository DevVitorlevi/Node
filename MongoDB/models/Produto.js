const conn = require('../db/conn')

class Produto {
    constructor(nome,preco,descricao){
        this.nome = nome
        this.preco = preco
        this.descricao = descricao
    }

    save(){
        const produto = conn.db().collection('produtos').insertOne({
            nome:this.nome,
            preco:this.preco,
            descricao:this.descricao
        })
        return produto
    }
}

module.exports = Produto