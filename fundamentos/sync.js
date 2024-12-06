const fs = require('fs') 
console.log('Creating') 
fs.writeFileSync('arq.txt', 'oi') 
// Usa o método 'writeFileSync' do módulo 'fs' para criar (ou sobrescrever, se já existir) o arquivo 'arq.txt'.
// O conteúdo do arquivo será 'oi'. A operação é síncrona, ou seja, o código espera a conclusão da escrita antes de continuar.
console.log('fim') 
