import Pagina from "../templates/componentes/Pagina.js";
import FormPessoa from "../Formularios/FormHospede.jsx";
import TabelaPessoa from "../tabelas/TabelaHospede.jsx";
import { useState, useEffect } from "react";
import "../tabelas/estilos/tabela.css";
import { urlBase } from "../utilitarios/definicoes.js";
import { Spinner } from "react-bootstrap";
import TabelaTelefone from "../tabelas/TabelaTelefone.jsx";
import FormTelefone from "../Formularios/FormTelefone.jsx";

export default function TelaCadastroTelefone(props) {

    const [exibirTabela, setExibirTabela] = useState(true);
    const [telefone, setTelefone] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [erro, setErro] = useState(null);
    const [processado, setProcessado] = useState(false);
    const [telefoneEmEdicao, setTelefoneEmEdicao] = useState(
        {
            ddd: "",
            numero: "",
            hospede: {
                codigo: 0
            }
        }
    );

    function prepararTelefoneParaEdicao(telefone) {
        console.log("Telefone para edição:", telefone);
        setModoEdicao(true);
        setTelefoneEmEdicao({
            codigo: telefone.codigo,
            ddd: telefone.ddd,
            numero: telefone.numero,
            hospede: {
                codigo: telefone.codigoHospede,
            },
        });
        setExibirTabela(false);
    }

    function buscarTelefone() {
        fetch(urlBase + "/telefone", {
            method: "GET"
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (Array.isArray(dados)) {
                setProcessado(true);
                setTelefone(dados);
            }
            else {
                setProcessado(true);
                setErro(dados.status)
            }
        });
    }

    function apagarTelefone(telefone) {
        fetch(urlBase + "/telefone", {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(telefone)
        }).then((resposta) => {
            return resposta.json()
        }).then((retorno) => {
            if (retorno.resultado) {
                alert("Não foi possível excluir a telefone!");
            }
            else {
                buscarTelefone();
            }
        })
    }

    useEffect(() => {
        buscarTelefone();
    }, []);


    return <Pagina>
        <div>
            {
                exibirTabela ?
                    <TabelaTelefone listaTelefones={telefone}
                        buscar={buscarTelefone}
                        setTelefone={setTelefone}
                        exibirTabela={setExibirTabela}
                        editarTelefone={prepararTelefoneParaEdicao}
                        excluirTelefone={apagarTelefone}
                        setModoEdicao={setModoEdicao}
                    /> :
                    <FormTelefone listaTelefones={telefone}
                        setTelefone={setTelefone}
                        exibirTabela={setExibirTabela}
                        buscar={buscarTelefone}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        pessoa={telefoneEmEdicao} />
            };
        </div>
    </Pagina>
}
