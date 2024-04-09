import TelefoneDB from "../Persistencia/TelefoneDB.js";
import VagaDB from ";;/Persistencia/VagaDB.js";


export default class Vaga{

    #codigo;
    #vaga;
    #hospede;

    constructor(codigo=0, vaga, hospede){
        this.#codigo = codigo;
        this.#vaga = vaga;
        this.#hospede = hospede;
    }

    //METODO CODIGO
    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }


    //METODO VAGA
    get vaga(){
        return this.#vaga;
    }

    set vaga(novoVaga){
        this.#vaga = novoVaga;
    }

    //METODO CODIGO HOSPEDE
    get hospede(){
        return this.#hospede;
    }

    set hospede(novohospede){
        this.#hospede = novohospede;
    }

    toJSON(){
        return {
            "codigo"      :this.#codigo,
            "vaga"      :this.#vaga,
            "hospede"   :this.#hospede

        }
    }

    async gravar(){
        const vagaDB = new VagaDB();
        this.#codigo = await vagaDB.incluir(this);
    }
    async atualizar(){
        const vagaDB = new VagaDB();
        await vagaDB.alterar(this);
    }


    async excluir(){
        const vagaDB = new VagaDB();
        await vagaDB.excluir(this);
    }

    async consultar(termo){
        const vagaDB = new VagaDB();
        const vaga = await vagaDB.consultar(termo);
        return vaga;
    }

    async consultarCodigo(codigo){
        const vagaDB = new VagaDB();
        const vaga = await vagaDB.consultarCodigo(codigo);
        return vaga;
    }
}