const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([
    {name:'nome', message:'Qual Seu Nome?'},
    {name:'Idade', message: 'Qual Sua Idade?'}
]).then((response)=>{
    if(!response.nome || !response.Idade){
        throw new Error(chalk.red('Por favor, preencha todos os campos.'));
    }else{
        console.log(chalk.bgYellowBright(`Nome: ${response.nome}, Idade: ${response.Idade}`));
    }
}).catch(err => console.error(err));