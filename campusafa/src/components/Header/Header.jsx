
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useState } from "react";


export function Header() {
    const Logo = './logo_afa.png';
    const start = <img alt="logo" src={Logo} width="45px" />;

    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    // return (
    //     <Link to="iniciosesion"></Link>
    // )

    return (
        <>
            <header>
                <nav>
                    <div className="logoNav"><Link to="/">{start}</Link></div>
                    <ul className="menu">
                        <li><Link to="institucional">INSTITUCIONAL</Link></li>
                        <li><Link to="noticias">NOTICIAS</Link></li>
                        <li><Link to="contacto">CONTACTO</Link></li>
                        <li><Link to="jugador">JUGADORES</Link></li>
                        <li><Link to="convocatoria">CONVOCATORIAS</Link></li>
                        <li><Link to="equipotitular">EQUIPO TITULAR</Link></li>
                    </ul>
                    {/* cAMBIAR */}
                    <div className="log">
                        <Button label="Iniciar sesión" severity="success" outlined  loading={loading} onClick={load}/>
                    </div>
                </nav>
            </header>

        </>
    );
}
