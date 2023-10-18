import React from 'react';
import { useState } from "react";
import axios from 'axios';
import './EquipoTitular.css';
import { Link } from 'react-router-dom';
import { TablaConvocatorias } from '../TablaConvocarotias/TablaConvocatorias';

export function Convocatorias() {

    
    return (
        <>
            <main>
                <section className='contconvocatoria'>
                    <div className="convocatoria">CONVOCATORIAS</div>
                    <TablaEquipoTitular/>
                </section>

            </main>

        </>
    );
}