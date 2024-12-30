const express = require('express')
const router = express.Router()

const TarefaController = require('../controllers/TarefaController')

router.get('/criar',TarefaController.criarTarefa)
router.get('/todas',TarefaController.todasTarefas)

module.exports = router