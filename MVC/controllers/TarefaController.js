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
    static async todasTarefas(req,res){
        const tarefas =  await Tarefa.findAll({raw:true})
        res.render('tarefa/todas',{tarefas})
    }
    static async apagarTarefa(req,res){
        const id = req.body.id
        console.log(id)
        await Tarefa.destroy({where:{id:id}})
        res.redirect('/tarefa/todas')
    }       
}