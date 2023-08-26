import React from 'react';
// import { useState } from "react";
import './Contacto.css';


export function Contacto() {
  // const [formulario, setformulario] = useState({});
  return (
    <>
      <main className="main-contacto">
        <section className="contenedor-contacto">
          <div className="contacto">
            <h1>CONTACTO</h1>
          </div>
        </section>
        <section className="contacto-info">
          <h2>PARA MÁS INFORMACIÓN</h2>
          <br></br>
          <form className="cont-form" id="formContactos">
              <label for="nombreyapellido"></label>
              <input className="control" id="nombreyapellido" type="text" placeholder="Nombre y Apellido:" required></input>
              <label for="email"></label>
              <input className="control" id="email" type="email" placeholder="Email:" required></input>
              <div className="asunto">
                <select className="asunt-cont" name="asunto" id="asunto">
                  <option selected disabled>ASUNTO</option>
                  <option value="jugador">Jugador</option>
                  <option value="cuerpotecnico">Técnico</option>
                  <option value="directivo">Directivo</option>
                  <option value="spondor">Sponsor</option>
                </select>
              </div>
              <div className="comentario">
                <textarea className="comentario-tex" id="comentario" rows="10" cols="20" placeholder="Comentario:"></textarea>
              </div>
              <div className="boton">
                <button type="submit" id="enviar-cont">ENVIAR</button>
              </div>
            


          </form>
        </section>
      </main>

    </>
  );
}
export default Contacto;