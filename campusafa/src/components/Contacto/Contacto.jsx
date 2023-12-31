import React from 'react';
import { useState } from "react";
import axios from 'axios';
import './Contacto.css';
import { Link } from 'react-router-dom';


export function Contacto() {
  // 
  //
  const face = <img src="/fc2.png" width={90} alt="Facebook AFA" />;
  const int = <img src="/int2.png" alt="Instagram AFA" width={90} />;
  // 
  const baseURL = 'http://localhost:3005/api/v1/publico/contacto';

  // un objeto que guarde la informacion del form
  const [formulario, setFormulario] = useState({ nombreyapellido: '', email: '', asunto: '', comentario: '' });
  

  
  const enviarInformacionForm = async(e)=>{
    e.preventDefault();

// argumentos: direccion del servidor, datos enviados al servidor
    axios.post(baseURL,formulario)
    .then( res => {
        const respuesta = 'correo enviado';
        // console.log(res);
        alert(respuesta);
        setFormulario({nombreyapellido: '', email: '', asunto: '', comentario: '' });
    })
    .catch( error=> {
        console.log('error ', error);
    });

};
  return (
    <>
      <main>
        <main className="main-contacto">
          <section className="contenedor-contacto">
            <div className="contacto">
              <h1>CONTACTO</h1>
            </div>
            <div className="redes">
              <ul>
                <li><Link to='https://www.facebook.com/AFASeleccionArgentina'>{face}</Link></li>
                <li><Link to='https://www.instagram.com/afaseleccion/'>{int}</Link></li>
                <li><Link to='https://twitter.com/Argentina'><img src="/tw2.png" alt="Twitter AFA" width={90} /></Link></li>
                <li><Link to='https://www.youtube.com/user/AFASeleccion'><img src="/yt2.png" alt="Youtobe AFA" width={90} /></Link></li>
              </ul>
            </div>
          </section>
          <section className="contacto-info">
            <h2>PARA MÁS INFORMACIÓN</h2>
            <br></br>
            <form onSubmit={(e) => enviarInformacionForm(e)} className="cont-form" id="formContactos">
              <label htmlFor="nombreyapellido"></label>
              <input className="controles" id="nombreyapellido" type="text" placeholder="Nombre y Apellido:" value={formulario.nombreyapellido} required onChange={(e) => setFormulario({ ...formulario, "nombreyapellido": e.target.value })} ></input>
              <label htmlFor="email"></label>
              <input className="controles" id="email" value={formulario.email} type="email" placeholder="Email:" required onChange={(e) => setFormulario({ ...formulario, "email": e.target.value })}></input>
              <div className="asunto">
                <select className="asunt-cont" name="asunto" value={formulario.asunto} id="asunto" onChange={(e) => setFormulario({ ...formulario, "asunto": e.target.value })}>
                  <option selected disabled>ASUNTO</option>
                  <option value="jugador">Jugador</option>
                  <option value="cuerpotecnico">Técnico</option>
                  <option value="directivo">Directivo</option>
                  <option value="sponsor">Sponsor</option>
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
      </main>


    </>
  );

}
export default Contacto;