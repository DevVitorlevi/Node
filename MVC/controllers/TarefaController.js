const Tarefa = require('../models/Tarefa')

module.exports = class TarefaController {
    static criarTarefa(req,res){
        res.render('tarefa/criar')
    }
    static async salvarTarefa(req,res){

        const DadosTarefa = {
            titulo: req.body.titulo,
            descricao:req.body.descricao,
            feita:false
        }

        await Tarefa.create(DadosTarefa)

        res.redirect('/tarefa/todas')
    }
    static todasTarefas(req,res){
        res.render('tarefa/todas')
    }
}