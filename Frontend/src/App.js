import TelaMenu from "./interfaces/TelaMenuSistema.js";
import Tela404 from "./interfaces/Tela404.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaCadastroHospede from "./interfaces/TelaCadastroHospede.jsx";
import TelaCadastroVagas from "./interfaces/TelaCadastroVagas.jsx";
//import TelaCadastroPessoa from "./Formularios/FormPessoa.jsx";
import FormTefone from "./Formularios/FormTelefone.jsx";

import './App.scss';
import 'boxicons/css/boxicons.min.css';
import TelaCadastroTelefone from "./interfaces/TelaCadastroTelefone.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/hospede" element={<TelaCadastroHospede />}/>
          <Route path="/" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="/frontendz" element={<TelaMenu></TelaMenu>}></Route>
          <Route path="*" element={<Tela404></Tela404>}></Route>
          <Route path="/telefone" element={<TelaCadastroTelefone />}></Route>
          <Route path="/vaga" element={<TelaCadastroVagas />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
