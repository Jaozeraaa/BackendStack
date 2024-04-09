import Hospede from "../Modelo/Hospede.js";
import Telefone from "../Modelo/Telefone.js";
import Vaga from "../Modelo/Vaga.js";


export default class VagaCtrl {

	gravar(requisicao, resposta) {
		resposta.type("application/json")

		if (requisicao.method === "POST" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.vaga || !dados.hospede || !dados.hospede.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer os dados corretos."
				});
				return;
			}

			const numero = dados.vaga;
			const codHospede = dados.hospede.codigo;

			const hospede = new Hospede(codHospede);

			hospede.consultarCodigo(codHospede)
				.then((hospedeEncontrado) => {
					if (hospedeEncontrado && hospedeEncontrado.length > 0) {
						const primeiroHospede = hospedeEncontrado[0];
						const vaga = new Vaga(0, vaga, primeiroHospede);

						vaga.gravar();

						return vaga;
					} else {
						return {
							status: false,
							mensagem: "Hospede não encontrado."
						};
					}
				})
				.then((vagaGravado) => {
					resposta.json({
						status: true,
						vaga: vagaGravado
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}


	consultar(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "GET") {
			const termo = requisicao.query.termo || "";
			const vaga = new Vaga();

			vaga.consultar(termo)
				.then((exemplares) => {
					resposta.json(exemplares);
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					})
				});
		}
		else {
			resposta.status(400).json({
				status: false,
				mensagem: "Requisição invalida! Método não permitido!"
			});
		}
	}

	consultarCodigo(requisicao, resposta) {
		resposta.type("application/json");

		const codigo = requisicao.params.codigo;

		if(requisicao.method === "GET"){
			const vaga = new Vaga();

			vaga.consultarCodigo(codigo)
				.then((vaga) => {
					resposta.json(vaga);
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					})
				});
		}
	}

	atualizar(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "PUT" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.codigo || !dados.vaga || !dados.hospede || !dados.hospede.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer codigo, vaga e hospede com código."
				});
				return;
			}

			const codigo = dados.codigo;
			const numero = dados.vaga;
			const codHospede = dados.hospede.codigo;

			const hospede = new Hospede(codHospede);

			hospede.consultarCodigo(codHospede)
				.then((hospedeEncontrado) => {
					if (hospedeEncontrado && hospedeEncontrado.length > 0) {
						const primeiroHospede = hospedeEncontrado[0];
						const vaga = new Vaga(codigo, vaga, primeiroHospede);

						vaga.atualizar()
						.then((vagaAtualizado) => {
							resposta.json({
								status: true,
								vaga: {
									codigo: vagaAtualizado.codigo,
									vaga: vagaAtualizado.numero,
									hospede: {
										codigo: vagaAtualizado.hospede.codigo,
										nome: vagaAtualizado.hospede.nome,
									}
								},
								mensagem: "Vaga atualizado com sucesso!"
							})
						})
						.catch((erro) => {
							resposta.json({
								status: false,
								mensagem: erro.message
							});
						});
						
					} else {
						return {
							status: false,
							mensagem: "Hospede não encontrado."
						};
					}
				})
				.then((vagaAtualizado) => {
					resposta.json({
						status: true,
						vaga: vagaAtualizado
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}

	excluir(requisicao, resposta) {
		resposta.type("application/json");

		if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
			const dados = requisicao.body;

			if (!dados.codigo) {
				resposta.json({
					status: false,
					mensagem: "Dados incompletos. Certifique-se de fornecer codigo."
				});
				return;
			}

			const codigo = dados.codigo;

			const vaga = new Vaga(codigo);

			vaga.excluir()
				.then((vagaExcluido) => {
					resposta.json({
						status: true,
						telefone: vagaExcluido
					});
				})
				.catch((erro) => {
					resposta.json({
						status: false,
						mensagem: erro.message
					});
				});

		}
		else {
			resposta.json({
				status: false,
				mensagem: "Hospede não encontrado ou vazio!"
			});
		}
	}


}