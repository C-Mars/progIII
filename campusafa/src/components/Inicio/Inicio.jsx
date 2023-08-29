import React from 'react';
import News from './News';
import NextMatch from './NextMatch';
import './Inicio.css';


export function Inicio(){
    return (
        <>
            <NextMatch />
            <div class="noticia-t">
        <h1>NOTICIAS</h1>
      </div>
                 <News />
          
        </>
    );
}