import React from 'react';

const NextMatch = () => {
  return (
    <div className="proximo-part">
      {/* ... (contenido de NextMatch) */
        <>
          <section class="principal">
            <div class="main-container">
              <div class="imagen-fondo">
                <img src="../arg-per.jpg"></img>
                <div class="texto-debajo">
                  <h1>Máxima Cita</h1>
                  <p><strong>La selección Femenina jugará con Perú en su partido despedida antes del mundial.</strong></p>
                </div>
              </div>
              <div class="proximo">
                <div class="proximo-part">
                  <h2>PRÓXIMO PARTIDO</h2>
                  <div>
                    <img src="../logo_afa_partido-05.png" width="100" height="109"></img>
                    <img src="../logo_afa_partido-01.png" width="100" height="109"></img>
                  </div>

                  <p>ARG VS PER</p>
                  <p>Viernes 14 de Julio <br></br>
                    Estadio Único de San Nicolás</p>
                </div>

                <div class="boton-vistas">
                  <div class="boton2">
                    <button onclick="partidos()" type="button" class="btn btn-primary">PARTIDOS</button>
                  </div>
                  <div class="boton2">
                    <button onclick="estadisticas()" type="button" class="btn btn-primary">ESTADÍSTICAS</button>
                  </div>
                </div>
                <div class="proximo-part">
                  <h2> VIDEOS</h2>
                  <iframe width="80%" src="https://www.youtube.com/embed/5GEkmBRhzbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </section>
        </>
      }

    </div>
  );
};

export default NextMatch;