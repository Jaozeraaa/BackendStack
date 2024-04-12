import { Form, Button, Container, Row, Col } from "react-bootstrap";
import React, { useState, useRef } from "react";
import { urlBase } from "../utilitarios/definicoes";
import Pagina from "../templates/componentes/Pagina";
import CaixaSelecao from "../componentes/componentes/CaixaSelecao";

export default function FormTelefone(props) {
  const [validado, setValidado] = useState(false);
  const [hospedeSelecionado, setHospedeSelecionado] = useState(0);
  const [hospede, setHospede] = useState(props.hospede);

  const [telefone, setTelefone] = useState({
    numero: '',
    hospede: {
      codigo: 0,
    },
  });

  
  const teleRef = useRef(null);

  const formatPhone = (value) => {
    const formattedValue = value
      .replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");

    return formattedValue;
  };

  const manipulaSubmissao = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    if (form.checkValidity()) {
      gravarDados({ ...hospede, hospede: hospedeSelecionado })
      setValidado(false);
    }
    else {
      setValidado(true);
    }


  };

  function gravarDados() {
    console.log(telefone);
    console.log(hospedeSelecionado);

    if (!props.modoEdicao) {
      fetch(urlBase + "/telefone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: telefone.numero,
          hospede: {
            codigo: hospedeSelecionado.codigo,
          },
        }),
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          console.log(data);
          window.alert("Telefone(s) cadastrado(s) com sucesso!");
          window.location.reload();
          props.setModoEdicao(false);
          props.exibirTabela(true);
        })
        .catch((erro) => console.error('Erro ao cadastrar telefone:', erro));
    }
    else {
      fetch(urlBase + "/telefone", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo: telefone.codigo,
          ddd: telefone.ddd,
          numero: telefone.numero,
          hospede: {
            codigo: hospedeSelecionado.codigo,
          },
        }),
      })
        .then((resposta) => {
          if (!resposta.ok) {
            throw new Error('Erro na atualização');
          }
          return resposta.json();
        })
        .then((dadosAtualizados) => {

          if (dadosAtualizados.resultado) {
            window.alertr("Erro ao atualizar o telefone!");
          } else {
            window.alert("Telefone atualizado com sucesso!");
            props.setModoEdicao(false);
            props.exibirTabela(true);
          }
        })
    }




  }


  return (
    <body id="corpo">
      <Container className="background mb-3">
        <Form
          noValidate
          validated={validado}
          onSubmit={manipulaSubmissao}
          className="mainForm"
        >
          <h1 className="text-center TituloTabela">Cadastro de vagas</h1>
          <Row>
            <Col md={2}>
              <Form.Group>
                <Form.Label htmlFor="codigo" className="form-label">
                  Codigo
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Automático"
                  id="codigo"
                  disabled
                  value={telefone.codigo}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="FormVaga">
                <Form.Label>Vagas</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Informe a vaga"
                  onChange={(e) =>
                    setTelefone({
                      ...telefone,
                      numero: formatPhone(e.target.value),
                    })
                  }
                  ref={teleRef}
                  maxLength={11}
                />
                <Form.Control.Feedback type="invalid">
                  Digite uma vaga Valida!
                </Form.Control.Feedback>

              </Form.Group>
            </Col>

            <Col>
              <Form.Group className="mb-3" controlId="titulo">
                <Form.Label>Selecione o Cadidato:</Form.Label>
                <CaixaSelecao
                  enderecoFonteDados={urlBase + "/hospede"}
                  campoChave={"codigo"}
                  campoExibicao={"nome"}
                  funcaoSelecao={setHospedeSelecionado}
                  valor={hospedeSelecionado}
                  id="telefone"
                  required
                />
                <Form.Control.Feedback type='invalid'>Selecione o Candidato</Form.Control.Feedback>
              </Form.Group>
            </Col>


          </Row>
          <Button type="submit" variant="primary" id="cadastrar">
            Cadastrar
          </Button>{" "}
          <Button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              props.exibirTabela(true);
              props.setModoEdicao(false);
            }}
          >
            Voltar
          </Button>{" "}
        </Form>
      </Container>
    </body>
  );
}
