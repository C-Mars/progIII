



<section class="contenedor-contacto">
      <div class="contacto"><h1>CONTACTO</h1></div>
    <section class="contacto-info">
      <h2>PARA MÁS INFORMACIÓN</h2>
      <br>
      <form class="cont-form" id="formContactos">
        <label for="nombreyapellido"></label>
        <input class="control" id ="nombreyapellido" type="text"  placeholder="Nombre y Apellido:" required>
        <label for="email"></label>
        <input class="control" id ="email" type="email" placeholder="Email:" required>
          <div class="asunto"> 
            <select class="asunt-cont" name="asunto" id="asunto">
              <option selected disabled>ASUNTO</option>
              <option value="jugador">Jugador</option>
              <option value="cuerpotecnico">Técnico</option>
              <option value="directivo">Directivo</option>
              <option value="spondor">Sponsor</label> 
            </select>
          </div>
          <div class="comentario">
            <textarea  class="comentario-tex" id="comentario" rows="10" cols="20" placeholder="Comentario:"></textarea>
          </div>
        <div class="boton">
          <button type="submit" id="enviar-cont">ENVIAR</button>
        </div>
      </form>
    </section>