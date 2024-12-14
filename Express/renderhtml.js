
const express = require('express');


const app = express();

// Importa o módulo path para manipulação de caminhos de arquivos e diretórios
const path = require('path');

// Define o caminho base da pasta 'html' no sistema de arquivos
// __dirname representa o diretório atual onde este arquivo está localizado
const Basepath = path.join(__dirname, 'html');

// Configura uma rota GET no caminho '/main'
app.get('/main', (req, res) => {
    // Envia o arquivo 'index.html' localizado na pasta 'html' como resposta
    res.sendFile(`${Basepath}/index.html`);
});

// Inicia o servidor para escutar na porta 8082
app.listen(8082, () => {
    // Exibe uma mensagem no console indicando que o servidor está rodando
    console.log('Servidor Rodando');
});
