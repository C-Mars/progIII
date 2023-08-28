
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
export function Header() {
    const Logo = './logo_afa.png';
    const start = <img alt="logo" src={Logo} width="45px" />;
    return (
        <>
            
            <nav>
                <div className="logoNav"><Link to="/">{start}</Link></div>
                <ul className="menu">
                    <li><Link to="institucional">INSTITUCIONAL</Link></li>
                    <li><Link to="noticias">NOTICIAS</Link></li>
                    <li><Link to="contacto">CONTACTO</Link></li>
                </ul>
            </nav>
        </>
    );
}