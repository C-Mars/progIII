
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
export function Header() {
    const Logo = './logo_afa.png';
    const start = <img alt="logo" src={Logo} width="45px" />;
    return (
        <>

            <nav>
                <ul className="menu">
                    <li className="logoNav"><Link to="/"> {start}</Link></li>
                    <li><Link to="institucional">INSTITUCIONAL</Link></li>
                    <li><Link to="contacto">CONTACTO</Link></li>
                </ul>
            </nav>
        </>
    );
}