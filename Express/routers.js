// Importa o framework Express para a criação do servidor
const express = require('express');
const app = express();

// Middleware para processar dados enviados no corpo da requisição em formato URL-encoded (como formulários HTML)
app.use(express.urlencoded({
    extended: true // Permite que objetos complexos sejam passados no corpo (ex: arrays, objetos aninhados)
}));

app.use(express.static('public'))

// Middleware para processar requisições em JSON
app.use(express.json());

// Importa o módulo 'index.js', onde as rotas de usuários estão definidas
const users = require('./users'); // Assumindo que o arquivo index.js está no mesmo diretório

// Importa o módulo 'path' para manipular caminhos de arquivos
const path = require('path');

// Define o caminho base onde os arquivos HTML estão localizados (neste caso, a pasta 'html')
const BasePath = path.resolve(__dirname, 'html');

// Usa as rotas definidas em 'index.js' e as associa ao prefixo '/users'.
// Isso significa que todas as rotas definidas dentro do arquivo 'index.js' estarão acessíveis a partir de '/users'.
// Exemplo: A rota '/users/add' irá servir o formulário de adicionar um usuário.
app.use('/users', users);

// Rota para a URL '/main'. Quando o usuário acessa essa URL, o servidor envia o arquivo 'index.html' como resposta.
app.get('/main', (req, res) => {
    // Envia o arquivo 'index.html' para o navegador do usuário
    res.sendFile(`${BasePath}/index.html`);
});

app.use((req,res,next)=>{
    res.status(404).sendFile(`${BasePath}/404.html`)
})

// Inicia o servidor na porta 8080 e exibe uma mensagem no console quando o servidor está funcionando
app.listen(4320, () => {
    console.log('Servidor Rodando'); // Confirma que o servidor foi iniciado corretamente
});
