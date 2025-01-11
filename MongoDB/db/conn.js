const {MongoClient}= require('mongodb')

const uri = "mongodb://127.0.0.1:27017/mongodbnode";


const client = new MongoClient(uri)

async function run() {
    try{
        await client.connect()
        console.log('Conexão Feita com sucesso')
    }
    catch(err){
        console.log('Conexão Fracassada',err)
    }
}

run()

module.exports = client