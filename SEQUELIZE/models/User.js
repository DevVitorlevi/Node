// Importa o módulo `DataTypes` do Sequelize, usado para definir os tipos de dados das colunas do modelo.
const { DataTypes } = require('sequelize');

// Importa a conexão com o banco de dados definida no arquivo '../db/conn'.
const db = require('../db/conn');

// Define um modelo chamado 'User' que representa uma tabela no banco de dados.
const User = db.define('User', {
    // Define a coluna 'name' com tipo STRING (texto).
    name: {
        type: DataTypes.STRING, // Tipo de dado: String
        required: true          // Define que é obrigatório (não é uma configuração do Sequelize; seria melhor usar `allowNull: false`).
    },
    // Define a coluna 'profissao' com tipo STRING (texto).
    profissao: {
        type: DataTypes.STRING, // Tipo de dado: String
        reqired: true           // Provavelmente deveria ser `required`, mas isso não é válido no Sequelize. Use `allowNull: false`.
    },
    // Define a coluna 'newsletter' com tipo BOOLEAN (verdadeiro ou falso).
    newsletter: {
        type: DataTypes.BOOLEAN // Tipo de dado: Boolean
    }
});

module.exports = User;
