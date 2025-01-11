// Importa o módulo 'express' para criar um roteador
const express = require('express');

// Cria uma nova instância do roteador do Express para gerenciar as rotas relacionadas às tarefas
const router = express.Router();

const ProdutosController = require('../controller/ProdutosController')

router.get('/', ProdutosController.todosProdutos)

module.exports = router