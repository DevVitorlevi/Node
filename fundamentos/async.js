const fs =require("fs");

console.log("initial")

fs.writeFile('aq.txt','oi',() =>{
    // Diferente do 'writeFileSync', essa função é assíncrona, ou seja, não bloqueia a execução do restante do código.
    // A terceira parte é uma função de callback, que será chamada quando a escrita do arquivo for concluída.

   setTimeout(()=>{
    console.log("Criado")
   },1000);
})
console.log("fim")