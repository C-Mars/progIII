import React from 'react';
import News from './News';
import NextMatch from './NextMatch';
import './Inicio.css';
import ApiSection from './ApiSection';
import { Noticias } from '../Noticias/Noticias';


export function Inicio() {
    return (
        <>
            <main>
                <NextMatch />
                <div class="noticia-t">
                    <h1>NOTICIAS</h1>
                </div>
                <News />
                <Noticias />
                {/* <ApiSection /> */}
            </main>

        </>
    );
}