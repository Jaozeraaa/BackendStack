import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.conexao && global.conexao.status != "disconnected"){
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host:"129.146.68.51",
        user:"aluno15-pfsii",
        password:"aluno15-pfsii",
        database:"backendAluno15pfsii"
    });


    global.conexao = conexao;

return conexao;
}
