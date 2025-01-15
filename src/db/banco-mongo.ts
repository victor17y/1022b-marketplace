import { MongoClient } from 'mongodb';

//const url = 'mongodb://localhost:27017';
//const client = new MongoClient(url);
//const dbName = 'banco1022b';
//await client.connect();
//const db = client.db(dbName);
class BancoMongo{
    private client:MongoClient
    constructor(){
        const url = 'mongodb://localhost:27017'
        const client = new MongoClient(url);
        this.client = client
    }

    async getConnection(){
        const conn = await this.client.connect();
        const db = this.client.db("banco1022b");
        return db
    }

    async end() {
        const conn = await this.client.connect(); 
        await conn.close();
    }
    async listar(){
        const conn = await this.getConnection()
        const result = await conn.collection("produtos").find().toArray()
        return result
    }
    async inserir(produto:{id:string,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const result = await conn.collection("produtos").insertOne(produto)
        return result
    }
    async excluir(id:string){
        const conn = await this.getConnection()
        const result = await conn.collection("produtos").deleteOne({id})
        return result
    }
    async alterar(id:string,produto:{id?:string,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const result = await conn.collection("produtos").updateOne({id},{$set:produto})
        return result
    }

}

export default BancoMongo
