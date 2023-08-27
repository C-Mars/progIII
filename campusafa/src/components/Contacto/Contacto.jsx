import React from 'react';
import { useState } from "react";
import './Contacto.css';


export function Contacto() {
  const [formulario, setFormulario] = useState({ nombreyapellido: "", email: "", asunto:"", comentario:""});
  const face = <img src="./fc2.png" width={50} alt="Facebook AFA" />
  const int =<img src="./int2.png" alt="Instagram AFA" width={50}/>
  return (
    <>
      <main className="main-contacto">
        <section className="contenedor-contacto">
          <div className="contacto">
            <h1>CONTACTO</h1>
          </div>
          <div className="redes">
            <ul>
              <li>{face}</li>
              <li>{int}</li>
              <li><img src="/public/twAFA.png" alt="Twitter AFA" width={50}/></li>
              <li><img src="/public/ytAFA.png" alt="Youtobe AFA" width={50} /></li>
            </ul>
          </div>
        </section>
        <section className="contacto-info">
          <h2>PARA MÁS INFORMACIÓN</h2>
          <br></br>
          <form onSubmit={() => alert(JSON.stringify(formulario))} className="cont-form" id="formContactos">
              <label for="nombreyapellido"></label>
              <input className="control" id="nombreyapellido" type="text" placeholder="Nombre y Apellido:"value={formulario.nombreyapellido}  required onChange={(e) => setFormulario({ ...formulario, "nombreyapellido": e.target.value })} ></input>
              <label for="email"></label>
              <input className="control" id="email" value={formulario.email} type="email" placeholder="Email:" required onChange={(e) => setFormulario({ ...formulario, "email": e.target.value })}></input>
              <div className="asunto">
                <select className="asunt-cont" name="asunto" value={formulario.asunto} id="asunto" onChange={(e) => setFormulario({ ...formulario, "asunto": e.target.value })}>
                  <option selected disabled>ASUNTO</option>
                  <option value="jugador">Jugador</option>
                  <option value="cuerpotecnico">Técnico</option>
                  <option value="directivo">Directivo</option>
                  <option value="spondor">Sponsor</option>
                </select>
              </div>
              <div className="comentario">
                <textarea className="comentario-tex" id="comentario" value={formulario.comentario} rows="10" cols="20" placeholder="Comentario:" onChange={(e) => setFormulario({ ...formulario, "comentario": e.target.value })}></textarea>
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