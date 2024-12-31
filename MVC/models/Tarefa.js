const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Tarefa = db.define('Tarefa',{
    titulo:{
        type:DataTypes.STRING,
        require:true 
    },
    descricao:{
        type:DataTypes.STRING,
        require:true 
    },
    feita:{
        type:DataTypes.BOOLEAN,
        require:true 
    },
})

module.exports = Tarefa