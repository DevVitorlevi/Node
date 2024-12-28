const { DataTypes } = require('sequelize');

// Importa a conexão com o banco de dados definida no arquivo '../db/conn'.
const db = require('../db/conn');
const User = require('./User')

// Define um modelo chamado 'User' que representa uma tabela no banco de dados.
const Endereço = db.define('Endereço', {
    // Define a coluna 'rua' com tipo STRING (texto).
    rua: {
        type: DataTypes.STRING, // Tipo de dado: String
        required: true          // Define que é obrigatório 
    },
    // Define a coluna 'number' com tipo STRING (texto).
    number: {
        type: DataTypes.STRING, // Tipo de dado: String
        required: true          
    },

    city: {
        type: DataTypes.STRING, // Tipo de dado: String
        required: true 
    }
});

Endereço.belongsTo(User)// Informa que o relacionamento é 1:1 ou seja 1 endereço vai ter somente 1 usuário, sendo assim criando o UserId

module.exports = Endereço;
