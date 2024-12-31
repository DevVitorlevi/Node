// Importa o modelo Tarefa para realizar operações no banco de dados
const Tarefa = require('../models/Tarefa');

// Define a classe TarefaController, que contém todos os métodos relacionados à lógica das tarefas
module.exports = class TarefaController {
    
    // Método para renderizar a página de criação de tarefas
    static criarTarefa(req, res) {
        res.render('tarefa/criar'); // Renderiza o template 'criar' dentro da pasta 'tarefa'
    }

    // Método assíncrono para salvar uma nova tarefa no banco de dados
    static async salvarTarefa(req, res) {
        // Cria um objeto com os dados recebidos do formulário
        const DadosTarefa = {
            titulo: req.body.titulo,     // Obtém o título da tarefa
            descricao: req.body.descricao, // Obtém a descrição da tarefa
            feita: false                // Define que a tarefa ainda não foi concluída
        };

        // Insere os dados no banco de dados usando o modelo Tarefa
        await Tarefa.create(DadosTarefa);

        // Redireciona o usuário para a lista de todas as tarefas
        res.redirect('/tarefa/todas');
    }

    // Método assíncrono para exibir todas as tarefas
    static async todasTarefas(req, res) {
        // Busca todas as tarefas do banco e retorna como objetos simples (raw:true)
        const tarefas = await Tarefa.findAll({ raw: true });

        // Renderiza o template 'todas' com os dados das tarefas
        res.render('tarefa/todas', { tarefas });
    }

    // Método assíncrono para apagar uma tarefa específica
    static async apagarTarefa(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa enviado pelo formulário

        // Remove a tarefa com o ID especificado do banco de dados
        await Tarefa.destroy({ where: { id: id } });

        // Redireciona para a lista de todas as tarefas
        res.redirect('/tarefa/todas');
    }

    // Método assíncrono para exibir a página de edição de uma tarefa específica
    static async editarTarefa(req, res) {
        const id = req.params.id; // Obtém o ID da tarefa a partir dos parâmetros da URL

        // Busca a tarefa pelo ID e retorna como objeto simples
        const tarefa = await Tarefa.findOne({ raw: true, where: { id: id } });

        // Renderiza o template 'editar' com os dados da tarefa
        res.render('tarefa/editar', { tarefa });
    }

    // Método assíncrono para atualizar os dados de uma tarefa
    static async atualizarTarefa(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa do formulário

        // Cria um objeto com os dados atualizados
        const DadosTarefa = {
            titulo: req.body.titulo,       // Novo título
            descricao: req.body.descricao // Nova descrição
        };

        // Atualiza a tarefa no banco de dados
        await Tarefa.update(DadosTarefa, { where: { id: id } });

        // Redireciona para a lista de todas as tarefas
        res.redirect('/tarefa/todas');
    }

    // Método assíncrono para atualizar o status (feita/não feita) de uma tarefa
    static async atualizarStatus(req, res) {
        const id = req.body.id; // Obtém o ID da tarefa do formulário

        // Determina o novo status da tarefa com base no valor enviado pelo formulário
        const Status = {
            feita: req.body.feita === '0' ? true : false // Atualiza para feita ou não feita
        };

        // Atualiza o status da tarefa no banco de dados
        await Tarefa.update(Status, { where: { id: id } });

        // Redireciona para a lista de todas as tarefas
        res.redirect('/tarefa/todas');
    }
};
