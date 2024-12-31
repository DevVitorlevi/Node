// Importa o módulo 'express' para criar um roteador
const express = require('express');

// Cria uma nova instância do roteador do Express para definir as rotas relacionadas às tarefas
const router = express.Router();

// Importa o controlador das tarefas, que contém os métodos que controlam as ações das rotas
const TarefaController = require('../controllers/TarefaController');

// Define uma rota GET para '/criar', que chama o método 'criarTarefa' do TarefaController
router.get('/criar', TarefaController.criarTarefa);
// Define uma rota POST para '/salvar', que chama o método 'salvarTarefa' do TarefaController
router.post('/salvar',TarefaController.salvarTarefa)

// Define uma rota GET para '/todas', que chama o método 'todasTarefas' do TarefaController
router.get('/todas', TarefaController.todasTarefas);

router.post('/apagar/:id',TarefaController.apagarTarefa)
// Exporta o roteador para que ele possa ser usado no arquivo principal do aplicativo (index.js)
module.exports = router;
