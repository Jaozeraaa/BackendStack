import Container from "react-bootstrap/Container";
import { FaHotel } from "react-icons/fa";

import "./estilos/Inicio.css";
import imgInicio from "../img/wallpaper.png";
import imgCama from "../img/cama-de-hotel-1585934862.png"
export default function Inicio() {
  return (
    <body id="wallpaperInicio" className="corLetra">
      <section>
        <div className="image-container">
          <img className="img" src={imgInicio}></img>
          <div className="listaCompleta text-overlay">
            <h2 className="text-center tituloHotel">
              Bem-Vindo ao Emprego ON
            </h2>
            <p className="paragrafo ">
              <p className="letraInicio">
                {" "}
                É um prazer tê-lo aqui! Seja bem-vindo a um lugar onde voce podera
                encontrar a vaga ideal para o seu perfil e curriculo
                Temos inumeras oportunidades para que vocÊ possa crescer e investir no futuro. Estamos
                ansiosos para tornar sua experiência conosco excepcional.
              </p>
            </p>
          </div>
        </div>
      </section>
      <section className="camas">
      </section>
    </body>
  );
}
