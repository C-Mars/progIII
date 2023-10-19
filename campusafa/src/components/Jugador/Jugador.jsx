import React from 'react';
import './Jugador.css';

import { TablaJugadores } from './TablaJugadores/TablaJugadores'
import { Grid } from '@mui/material';


export function Jugador() {


    return (
        <>

            <section className='contjugadores'>
                <div className="jugadores">JUGADORES</div>
            </section>
            <Grid>
                
                <TablaJugadores />
            </Grid>

        </>
    );
}

export default Jugador;