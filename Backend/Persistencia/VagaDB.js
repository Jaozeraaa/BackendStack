
import Telefone from "../Modelo/Telefone.js";
import conectar from "./Conexao.js";
import Vaga from "../Modelo/Vaga.js";


export default class VagaDB {

    async incluir(vaga) {

        if (vaga instanceof Vaga) {
            const conexao = await conectar();
            const sql = "INSERT INTO vaga(vaga, codHospede) VALUES(?, ?, ?)";
            const parametros = [
                vaga.vaga,
                vaga.hospede.codigo
            ];
            const resultado = await conexao.query(sql, parametros);
            return await resultado[0].insertId;
        }
    }


    async alterar(vaga) {

        if (vaga instanceof Vaga) {
            const conexao = await conectar();
            const sql = "UPDATE vaga SET vaga=?, codHospede=?  WHERE codigo=?"
            const valores = [
                vaga.vaga,
                vaga.hospede.codigo,
                vaga.codigo
            ]
            await conexao.query(sql, valores);

        }
    }

    async excluir(vaga) {
        if (vaga instanceof Vaga) {
          const conexao = await conectar();
      
          // Obtenha o código do hospede associado ao telefone
          const sqlBuscarHospede = "SELECT codHospede FROM vaga WHERE codigo=?";
          const [rows] = await conexao.query(sqlBuscarHospede, [vaga.codigo]);
      
          if (rows.length > 0) {
            const codHospede = rows[0].codHospede;
      
            // Excluir o telefone
            const sqlExcluirVaga = "DELETE FROM vaga WHERE codigo=?";
            await conexao.query(sqlExcluirVaga, [vaga.codigo]);
      
            // Verificar se o hospede tem mais telefones, se não tiver, exclua o hospede
            const sqlContarVagas = "SELECT COUNT(*) AS total FROM vaga WHERE codHospede=?";
            const [result] = await conexao.query(sqlContarVagas, [codHospede]);
      
            if (result[0].total === 0) {
                const sqlExcluirHospede = "DELETE FROM hospede WHERE codigo=?";
                await conexao.query(sqlExcluirHospede, [codHospede]);
            }
          }
        }
      }
      

      async consultar(termo) {
        const listaVaga = [];
        const conexao = await conectar();
        const sql = `
          SELECT
            h.codigo AS codigoHospede,
            h.nome,
            t.codigo AS codigo,
            t.vaga
          FROM
            hospede h
          LEFT JOIN
            vaga t ON h.codigo = t.codHospede
          WHERE
            h.nome LIKE ?
        `;
        const parametros = ['%' + termo + '%'];
      
        const [rows] = await conexao.query(sql, parametros);
      
        for (const row of rows) {
          if (row.codigo !== null) {
            const hospedeFormatado = {
              codigo: row.codigo,
              vaga: row.vaga,
              codigoHospede: row.codigoHospede,
              nome: row.nome
            };
            listaVaga.push(hospedeFormatado);
          }
        }
      
        return listaVaga;
      }
      
    

    async consultarCodigo(codigo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM vaga WHERE codigo = ?";
        const parametros = [codigo]; 
        const [rows] = await conexao.query(sql, parametros);

        const listaVaga = [];
      
        for(const row of rows){
            const vaga = new Vaga(row['codigo'], row['vaga'], row['codHospede']);
            listaVaga.push(vaga);
        }
        
        return listaVaga;
    }


}