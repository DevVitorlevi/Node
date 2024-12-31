// Importa o módulo 'express' para criar um roteador
const express = require('express');

// Cria uma nova instância do roteador do Express para gerenciar as rotas relacionadas às tarefas
const router = express.Router();

// Importa o controlador das tarefas, que contém os métodos responsáveis pela lógica das rotas
const TarefaController = require('../controllers/TarefaController');

// Rota GET para a página de criação de tarefas
// Quando o usuário acessar '/criar', o método 'criarTarefa' do controlador será chamado
router.get('/criar', TarefaController.criarTarefa);

// Rota POST para salvar uma nova tarefa
// Quando o formulário de criação de tarefa for enviado, esta rota chamará o método 'salvarTarefa'
router.post('/salvar', TarefaController.salvarTarefa);

// Rota GET para listar todas as tarefas
// Quando o usuário acessar '/todas', o método 'todasTarefas' será chamado para exibir todas as tarefas
router.get('/todas', TarefaController.todasTarefas);

// Rota POST para apagar uma tarefa
// Quando o formulário ou ação de exclusão for executado, o método 'apagarTarefa' será chamado
router.post('/apagar', TarefaController.apagarTarefa);

// Rota GET para editar uma tarefa específica
// Quando o usuário acessar '/editar/:id', o método 'editarTarefa' será chamado com o ID da tarefa como parâmetro
router.get('/editar/:id', TarefaController.editarTarefa);

// Rota POST para atualizar uma tarefa
// Quando o formulário de edição de uma tarefa for enviado, o método 'atualizarTarefa' será chamado
router.post('/atualizar', TarefaController.atualizarTarefa);

// Rota POST para atualizar o status de uma tarefa
// Quando o usuário alterar o status de uma tarefa, esta rota chamará o método 'atualizarStatus'
router.post('/statustarefa', TarefaController.atualizarStatus);

// Exporta o roteador para que ele possa ser usado no arquivo principal do aplicativo (ex.: 'app.js')
module.exports = router;

