import React from 'react';
import './Noticias.css';

const News = () => {
  return (
    
    <div className="noti">
      {/* ... (contenido de News) */
      
      <>
      
<div class="contenedor-noticias">
        <div class="noti">
          <img class="img-noti" src="./pres_copa.jpg" alt="Foto de la primer Noticia" width="100%">
</img>          <p>MUNDIAL</p>
          <h3>La AFA presentó el trofeo del Mundial que recorrerá 32 países</h3>
          <p class="noti-p">El evento, llevado a cabo en el Predio Lionel Messi de Ezeiza, contó con el galardón que pasará por Asia, África, América del Norte y Europa, y que luego llegará a las nueve ciudades anfitrionas de la Copa, que comienza el 20 de julio. Fuente: TELAM SE.</p>
          <div class="vermas">
            <a href="https://www.telam.com.ar/notas/202304/624240-afa-trofeo-mundial-femenino-32-paises-australia-nueva-zelanda-2023.html" class="btn btn-primary">VER MÁS</a>
          </div>
        </div>
        <div class="noti">
          <img class="img-noti" src="./clas_seleccion.jpg" alt="Foto de la segunda Noticia" width="100%">
          </img><p>MUNDIAL</p>
          <h3>El seleccionado femenino apunta al Mundial de Australia y Nueva Zelanda 2023 vía judicial.</h3>
          <p class="noti-p">Ese tercer lugar logrado en la Copa América de Colombia significó un momento histórico para el equipo argentino de fútbol, que tuvo a la delantera Yamila Rodríguez como goleadora del torneo continental. Fuente: TELAM SE</p>
          <div class="vermas">
            <a href="https://www.telam.com.ar/notas/202212/615603-deportes-futbol-femenino-anuario-2022.html" class="btn btn-primary">VER MÁS</a>
          </div>
        </div>
        <div class="noti">
          <img class="img-noti" src="./camiseta_alternativa.jpg" alt="Foto de la tercera Noticia" width="100%">
      </img>    <p>MUNDIAL</p>
          <h3>El seleccionado argentino presentó la camiseta para el Mundial 2023</h3>
          <p class="noti-p">Por primera vez, el equipo femenino contará con una camiseta de diseño exclusivo, inspirado en los colores que poseen los distintos paisajes naturales que tiene el país en toda su extensión. Fuente: TELAM SE.</p>
          <div class="vermas">
            <a href="https://www.telam.com.ar/notas/202303/623351-futbol-femenino-camiseta-presentacion-afa-campeonato-mundial.html" class="btn btn-primary">VER MÁS</a>
          </div>
        </div>
      </div>
         
      
      </>
      
      
      }
    </div>
  );
};

export default News;
