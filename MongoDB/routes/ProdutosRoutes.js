// Importa o módulo 'express' para criar um roteador
const express = require('express');

// Cria uma nova instância do roteador do Express para gerenciar as rotas relacionadas às tarefas
const router = express.Router();

const ProdutosController = require('../controller/ProdutosController')

router.get('/', ProdutosController.todosProdutos)
router.get('/criar', ProdutosController.criarProduto)
router.post('/adicionar', ProdutosController.adicionarProduto)
router.get('/:id', ProdutosController.viewProduto)
router.get('/edit/:id', ProdutosController.editarProduto)
router.post('/atualizar', ProdutosController.atualizarProduto)

module.exports = router