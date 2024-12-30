const express = require('express')
const exphbs = require("express-handlebars")

    const conn = require('./db/conn')
    const Tarefa = require('./models/Tarefa')
    const TarefaRotas = require('./routers/TarefasRotas')



    const app = express()

    app.use('/tarefa', TarefaRotas)
    app.engine('handlebars', exphbs.engine()) 
    app.set('view engine', 'handlebars')

    app.use(express.urlencoded({
        extended:true
    }))
    app.use(express.json())

    conn.sync().then(()=>app.listen(3000)).catch((e=>console.log(e)))