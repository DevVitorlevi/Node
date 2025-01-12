// Importa o módulo mongoose para interagir com o MongoDB
const mongoose = require('mongoose');

// Desestrutura o Schema do mongoose, que será usado para definir a estrutura dos dados
const { Schema } = mongoose;

// Define o modelo "Produto" com base em um esquema específico
const Produto = mongoose.model('Produto', 
    new Schema({
        // Define o campo "nome", que é uma string e obrigatório
        nome: { type: String, required: true },

        // Define o campo "preco", que também é um Number e obrigatório
        preco: { type: Number, required: true, min:0 },

        // Define o campo "descricao", que é uma string e obrigatório
        descricao: { type: String, required: true },

        // Define o campo "image", que armazena um caminho ou URL da imagem como string, e é obrigatório
        image: { type: String, required: true },
    })
);

// Exporta o modelo "Produto" para ser usado em outras partes do projeto
module.exports = Produto;
