import './Institucional.css'
import '../../primereact-theme/theme.css'
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { PhotoService } from './service/PhotoService';

export default function ItemWithoutThumbnailsDemo() {
    const [images, setImages] = useState(null);

    useEffect(() => {
            PhotoService.getImages().then(data => setImages(data));
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    return (
        <div className="card"> 
            <Galleria value={images} numVisible={5} circular style={{ maxWidth: '640px' }}
                showThumbnails={false} showItemNavigators item={itemTemplate} thumbnail={thumbnailTemplate} />
        </div>
    )
}



export function Institucional() {
    return (
        <>
            <main>
                <section className="historia">
                    <div className="historia-t"><h1> HISTORIA </h1>
                        <p>El Campeonato de Fútbol Femenino de Primera División A es la máxima competición de este deporte en Argentina, que se juega oficialmente desde 1991. Está organizada por la Asociación del Fútbol Argentino.
                            <br />Hasta 2015, llevaba el nombre de Campeonato de Fútbol Femenino, ya que era el único concurso en disputa. A partir de 2016, con la creación de una segunda categoría, el certamen tomó su denominación actual.1 El campeón clasifica a la Copa Libertadores Femenina. A su vez, dos equipos descienden a la Primera División B.
                            <br />Los equipos que participan del torneo son del Área Metropolitana de Buenos Aires, La Plata, Rosario y Córdoba. Este no es el único torneo de fútbol femenino que se desarrolla en Argentina, ya que en las distintas ligas regionales existen torneos locales. Además, se disputa el Campeonato Nacional Femenino de Equipos y Selecciones de Ligas.
                            <br />El 16 de marzo de 2019, la AFA anunció el inicio de la semiprofesionalización de la liga de fútbol femenino. Esta comenzaría a partir de la asignación de entre ocho y once contratos mensuales para las futbolistas de cada uno de los planteles que conforman actualmente la Primera División.</p>

                    </div>
                    <div className='galeria-int'>
                        <ItemWithoutThumbnailsDemo/>
                    </div>
                </section >
            </main >
        </>
    );
}