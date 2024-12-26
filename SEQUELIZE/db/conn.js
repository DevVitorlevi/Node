const {Sequelize}= require("sequelize")

const sequelize = new Sequelize('nodesequelize','root','',{
    host:'localhost',
    dialect:'mysql'
})
sequelize.authenticate()
.then(()=>{
    console.log('Conectado Com Sucesso')

})
.catch(err=>console.log(err))