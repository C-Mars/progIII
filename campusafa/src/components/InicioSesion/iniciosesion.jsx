import React from 'react';
import { useState } from "react";
import axios from 'axios';
import './iniciosesion.css';
import { Link } from 'react-router-dom';

export function InicioSesion() {
    const poster = <img width="476px" alt="Poster Mundial Femenino 2023"src='./porter_mundial.jpg'/>
    return (
        <>
            <main>
                <section className="cont-inisesion">
                    <div className="img-sesion">
                        {poster}
                    </div>
                    <div className="cont-form">
                        <form action="../index.html">
                            <fieldset>
                                <legend>Inicio de Sesión</legend>
                                <div className="fila-ses">
                                    <label for="textUsuario">Nombre de usuario</label>
                                    <input id="textUsuario" name="usuario" type="text" placeholder="Escriba aquí su usuario"></input>
                                </div>
                                <div className="fila-ses">
                                    <label for="texcontrasenia">Contraseña</label>
                                    <input type="password" name="contrasenia" id="texcontrasenia" placeholder="Escriba aquí su contraseña"></input>
                                </div>
                            </fieldset>
                            <div className="sugerencia">
                                <p className="su-tex">¿Ha olvidado su nombre de usuario o contraseña?</p>
                            </div>
                            <div className="boton2">
                                <button onclick="validarUsuario()">INICIAR SESIÓN</button>
                            </div>
                            <div className="sugerencia-2">
                                <p className="su-tex">Al iniciar sesión, acepta nuestros Términos de uso.</p>
                            </div>
                            <div className="boton2">
                                <button onclick="crearCuenta()">CREAR UNA CUENTA</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}