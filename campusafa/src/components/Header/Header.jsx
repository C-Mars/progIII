
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
// import { Button } from 'primereact/button';
import { useState } from "react";
import { Button } from '@mui/material';
import InicioSesion from '../InicioSesion';


export function Header() {
    const Logo = './logo_afa.png';
    const start = <img alt="logo" src={Logo} width="45px" />;

    
    

    // 

    return (
        <>
            <header>
                <nav className='nav-p'>
                    <div className="logoNav"><Link to="/">{start}</Link></div>
                    <ul className="menu">
                        <li><Link to="institucional">INSTITUCIONAL</Link></li>
                        <li><Link to="contacto">CONTACTO</Link></li>
        
                      
                    </ul>
                    {/* cAMBIAR */}
                    <div >
                        <Button
                            color="success"
                            variant="outlined"
                            href="iniciosesion"
                            radius="none"
    
                    >Iniciar sesión</Button>
                    </div>
                </nav>
            </header>

        </>
    );
}
