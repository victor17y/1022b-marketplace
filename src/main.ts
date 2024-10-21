import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

//criar um obijeto do tipo express.
const app = express ()
//incluir pra ele receber json
app.use(express.json())
//incluir o cors-> quando a gente tem outra porta faz 
app.use(cors())
//rotas
app.get("/produtos",async(req,res)=>{
try{ 
    const conexao = await mysql.createConnection({
        host:process.env.dbhost?process.env.dbhost:"localhost",

        database:process.env.dbname?process.env.dbname:"banco1022b",

        user:process.env.dbuser?process.env.dbuser:"root",

        password:process.env.dbpassword?process.env.dbpassword:"",

        port:process.env.dbport?parseInt(process.env.dbport):3306,

    })
    const [result,filds]=await conexao.query("select*from produtos")
 await conexao.end()
    res.send(result)}
catch(e){
    res.status(500).send("erro do servidor")
}
})
//iniciar o servidor
app.listen (8000,()=>{
    console.log('servidor iniciado na porta 8000')
})
/*Adicione uma nova rota, por exemplo: `GET /usuarios`, que retornará todos os usuários cadastrados no banco de dados.

   - Garanta que as consultas ao banco de dados sejam feitas corretamente para listar tanto produtos quanto usuários.

   - Teste a nova rota usando o navegador para garantir que ela está funcionando antes de construir o front-end.*/
   app.get("/usuarios",async(req,res)=>{
    try{
        const conexao = await mysql.createConnection({
            host:process.env.dbhost?process.env.dbhost:"localhost",
            database:process.env.dbname?process.env.dbname:"banco1022b",
            user:process.env.dbuser?process.env.dbuser:"root",
            password:process.env.dbpassword?process.env.dbpassword:"",
            port:process.env.dbport?parseInt(process.env.dbport):3306,
            })
            const [result,filds]=await conexao.query("select*from usuarios")
 await conexao.end()
    res.send(result)}
catch(e){
    res.status(500).send("erro do servidor")
        }
    })



