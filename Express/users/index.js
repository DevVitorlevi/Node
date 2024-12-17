// Importa o framework Express para criar um roteador
const express = require('express');
// Cria uma instância de um roteador Express, responsável por definir as rotas
const router = express.Router(); 

// Importa o módulo 'path' para manipular e resolver caminhos de arquivos no sistema
const path = require('path'); 

// Define o caminho base onde os arquivos HTML estão localizados. O caminho será relativo ao diretório atual.
const BasePath = path.resolve(__dirname, '../html'); // Aqui, '..' sobe um nível da pasta onde o arquivo atual está, assumindo que a pasta 'html' esteja um nível acima.


// Rota GET para exibir o formulário de adição de um usuário.
// Quando o usuário acessa '/users/add', o servidor responde com o arquivo 'form.html' para preencher o formulário.
router.get('/add', (req, res) => {
    // Envia o arquivo 'form.html' localizado no caminho definido por BasePath.
    res.sendFile(`${BasePath}/form.html`);
});

// Rota POST para processar e salvar as informações do usuário.
// Esta rota é acionada quando o formulário é enviado via POST (contendo dados de nome e idade, por exemplo).
router.post('/save', (req, res) => {
    // Exibe no console os dados que foram enviados no corpo da requisição
    console.log(req.body); // 'req.body' contém os dados recebidos, que foram enviados pelo formulário.

    // Extrai os campos 'nome' e 'idade' do corpo da requisição (os valores enviados pelo formulário)
    const nome = req.body.nome;
    const idade = req.body.idade;

    // Após processar os dados, envia de volta o arquivo 'form.html', possivelmente para que o usuário preencha novamente ou veja os resultados.
    res.sendFile(`${BasePath}/form.html`);

    // Exibe no console as informações recebidas (nome e idade do usuário) para fins de depuração ou logs.
    console.log(`O Nome do Usuário é ${nome} e sua Idade é ${idade}`);
});

// Rota GET que aceita um parâmetro dinâmico na URL.
// Quando o usuário acessa uma URL com um 'id' específico (por exemplo: /users/123), o servidor envia o arquivo 'users.html'.
router.get('/:id', (req, res) => {
    // Acessa o parâmetro 'id' da URL fornecida. Isso captura o valor que foi colocado no lugar de ':id'.
    const id = req.params.id;

    // Envia o arquivo 'users.html' como resposta. Aqui, assume-se que a página 'users.html' possa exibir ou processar informações com base no id.
    res.sendFile(`${BasePath}/users.html`);

    // Imprime no console que estamos tentando buscar ou processar um usuário com o 'id' fornecido.
    console.log(`Estamos Buscando Pelo User: ${id}`);
});

// Exporta o roteador para que ele possa ser usado em outros arquivos (como o arquivo principal da aplicação).
module.exports = router;
