import React from 'react';
import { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext/UserContext';
import axios from 'axios';
import './InicioSesion.css'
import { Link } from 'react-router-dom';

export function InicioSesion() {
    const poster = <img width="476px" alt="Poster Mundial Femenino 2023" src='./porter_mundial.jpg' />
    
    const baseURL = 'http://localhost:3005/api/v1/';
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState({ correoElectronico: '', clave: '' });

    const { setUserData } = useContext(UserContext);
    console.log(setUserData.token);

    const enviarInformacion = async (e) => {
        e.preventDefault();

        axios.post(baseURL + 'auth/login', formulario)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);

                    // con los datos del usuario seteo el contexto del usuario, 
                    // también seteo el token para utilizarlo en las consultas al back
                    setUserData({ user: res.data.usuario, token: res.data.token });
                    navigate('/privado/dashboard');
                }
                // tarea, qué pasa si no se loguea correctemente?!
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <>
            <main>
                <section className="cont-inisesion">
                    <div className="img-sesion">
                        {poster}
                    </div>
                    <div className="cont-form">
                        <form onSubmit={e => enviarInformacion(e)}>
                            <fieldset>
                                <legend>Inicio de Sesión</legend>
                                <div className="fila-ses">
                                    <label htmlFor="emailUsuario">Correo Electrónico</label>
                                    <input id="emailUsuario" name="usuario" type="email" placeholder="Escriba  su email"
                                        onChange={(e) => setFormulario({ ...formulario, correoElectronico: e.target.value })}
                                        value={formulario.correoElectronico} required></input>
                                </div>
                                <div className="fila-ses">
                                    <label htmlFor="texcontrasenia">Contraseña</label>
                                    <input type="password" name="contrasenia" id="texcontrasenia" placeholder="Escriba aquí su contraseña"
                                     onChange={(e) => setFormulario({ ...formulario, clave:e.target.value })}
                                     value={formulario.clave} required></input>
                                </div>
                            </fieldset>

                            <div className="boton2">
                                <button type="submit">INICIAR SESIÓN</button>
                            </div>
                            <div className="sugerencia-2">
                                <p className="su-tex">Al iniciar sesión, acepta nuestros Términos de uso.</p>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}