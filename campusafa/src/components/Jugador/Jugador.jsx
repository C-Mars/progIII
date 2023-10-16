import React from 'react';
import './jugador.css';
import { TablaJugadores } from '../TablaJugadores/TablaJugadores';



export function Jugador() {

    
    return (
        <>
            {/* <main>
                <section className="cont-inisesion">
                    <div className="cont-form">
                        <form action="../index.html">
                            <fieldset>
                                <legend>Nuevo Jugador</legend>
                                <div className="fila-ses">
                                    <label for="textNombre">Nombre</label>
                                    <input id="textNombre" name="nombre" type="text" placeholder="Ingrese el nombre del Jugador"></input>
                                </div>
                                <div className="fila-ses">
                                    <label for="textApellido">Apellido</label>
                                    <input id="textApellido" name="apellido" type="text" placeholder="Ingrese el apellido del Jugador"></input>
                                </div>
                                <div className="select">
                                    <label for="posicionjugadores"></label>
                                    <select className="pos-cont" name="posicions" id="posicionjugadores" required>
                                        <option selected disabled>POSICIÓN</option>
                                        <option value="arquero">ARQUERO</option>
                                        <option value="defensor">DEFENSOR</option>
                                        <option value="mediocampista">MEDIOCAMPISTA</option>
                                        <option value="delantero">DELANTERO</option>
                                    </select>
                                    <label for="piejugadores"></label>
                                    <select className="pos-cont" name="pie" id="piejugadores" required>
                                        <option value="">Seleccionar</option>
                                        <option selected disabled>PIE HÁBIL</option>
                                        <option value="pderecho">DERECHO</option>
                                        <option value="Pizquierdo">IZQUIERDO</option>
                                    </select>
                                    
                                </div>
                            </fieldset>
                        
                   


                    <div className="boton2">
                        <button onclick="validarUsuario()">GUARDAR</button>
                    </div>

                    <div className="boton2">
                        <button onclick="crearCuenta()">CANCELAR</button>
                    </div>
                </form>
            </div>
            <div className="img-sesion">
                {poster}
            </div>
        </section >
            </main > */}
            <main>
                <section className='contjugadores'>
                    <div className="jugadores">JUGADORES</div>
                    <TablaJugadores/>
                </section>

            </main>

        </>
    );
}

export default Jugador;