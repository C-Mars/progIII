 
import React from 'react';
import './Header.css';
import {Link}  from 'react-router-dom';
export function Header() {
    const Logo = <img src='/public/Logo_AFA-02.png'  alt="Logo de la AFA"/>
    return (
        <>
            <div className="logoNav">
                <Link to="/"> {Logo}
                </Link> 
            </div>
            <nav>
                <ul className="menu">
                    <li><Link to="institucional">INSTITUCIONAL</Link></li>
                    <li><Link to="contacto">CONTACTO</Link></li>
                </ul>
            </nav>
        </>
    );
}