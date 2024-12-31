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
    static async todasTarefas(req,res)
    {  
        const tarefas =  await Tarefa.findAll({raw:true})
        res.render('tarefa/todas',{tarefas})
    }
    static async apagarTarefa(req,res){
        const id = req.body.id
        console.log(id)
        await Tarefa.destroy({where:{id:id}})
        res.redirect('/tarefa/todas')
    }     
    static async  editarTarefa(req,res){
        const id = req.params.id
        const tarefa = await Tarefa.findOne({raw:true,where:{id:id}})
        res.render('tarefa/editar', {tarefa})
    }
    static async atualizarTarefa(req,res){

        const id = req.body.id
        const DadosTarefa = {
            titulo: req.body.titulo,
            descricao: req.body.descricao
        }
        await Tarefa.update(DadosTarefa,{where:{id:id}})
        res.redirect('/tarefa/todas')
    }

    static async atualizarStatus(req,res){
        const id = req.body.id

        const Status ={
            feita:req.body.feita === '0' ? true : false
        }
        await Tarefa.update(Status,{where:{id:id}})
        res.redirect('/tarefa/todas')
    }
}