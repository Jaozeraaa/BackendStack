import { Router } from "express";
import TelefoneCtrl from "../Controle/TelefoneCtrl.js";
import VagaCtrl from "../Controle/VagasCtrl.js";


const rotaVaga = new Router();
const vagaCtrl = new VagaCtrl();


rotaVaga
.post('/', vagaCtrl.gravar)
.put('/',  vagaCtrl.atualizar)
.delete('/',  vagaCtrl.excluir)
.get('/',  vagaCtrl.consultar)
.get('/:codigo',  vagaCtrl.consultarCodigo);

export default rotaVaga;