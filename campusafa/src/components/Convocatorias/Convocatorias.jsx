import React from 'react';
import { useState } from "react";
import axios from 'axios';
import './Convocatorias.css';
import { Link } from 'react-router-dom';
import { TablaConvocatorias } from './TablaConvocatorias/TablaConvocatorias';

export function Convocatorias() {

    
    return (
        <>
            <main>
                <section className='contconvocatoria'>
                    <div className="convocatoria">CONVOCATORIAS</div>
                    <TablaConvocatorias/>
                </section>

            </main>

        </>
    );
}