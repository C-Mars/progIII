import React from 'react';
import { useState, useEffect } from 'react';
import { Box, FormLabel, TextField, FormControl, MenuItem, InputLabel, Select, Button } from '@mui/material';
import axios from 'axios';


export function FormJugador() {
    // Nuevo futbolista
    const baseURL = 'http://localhost:3005';
    // Guarda la info
    const [formulario, setFormulario] =
        useState({ dni: '', nombre: '', apellido: '', posicion: '', apodo: '', piehabil: '' });
    // Buscar futbolistas lista actualizada
    // datos de estudiantes
    const [datos, setDatos] = useState([]);


    useEffect(() => {
        BuscarTodosFutbolistas();
    }, []);

    const BuscarTodosFutbolistas = async () => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas')
            .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);

            })
            .catch(error => {
                console.log(error);
            })
    }

    const enviarInformacion = async (e) => {
        e.preventDefault();
        // console.log(formulario);

        axios.post(baseURL + '/api/v1/futbolista/futbolistas', formulario)
            .then(res => {
                console.log(res);
                // alert(res.data.msj);
                setFormulario({
                    dni: '',
                    nombre: '',
                    apellido: '',
                    posicion: '',
                    apodo: '',
                    piehabil: ''
                });
                BuscarTodosFutbolistas();
            })
            .catch(error => {
                console.log('error ', error);
            });
    }
    const [open, setOpen] = React.useState(false);

    

    const handleClose = () => {
        setOpen(false);
    };
    // // Seleccionador/posicion y pie habil
    // const [posicion, setPosicion] = React.useState('');

    // const handleChange = (event) => {
    //     setPosicion(event.target.value);
    // };

    // const [piehabil, setPiehabil] = React.useState('');
    // const handleChange = (event) => {
    //     setPiehabil(event.target.value);
    // };
    return (
        <>
            <Box component="form" >
                {/* NOMBRE */}
                <TextField
                    id="nombre"
                    label="Nombre"
                    type='texto'
                    variant="standard"
                    margin="normal"
                    // helperText="Ingrese un Nombre válido"
                    fullWidth
                    // error
                    required
                    value={formulario.nombre}
                    onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                />
                {/* APELLIDO */}
                <TextField
                    id="apellido"
                    label="Apellido"
                    type='texto'
                    variant="standard"
                    margin="normal"
                    // helperText="Ingrese un apellido válido"
                    fullWidth
                    // error
                    required
                    value={formulario.apellido}
                    onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
                />
                {/* DNI */}
                <TextField
                    id="dni"
                    label="dni"
                    type='number'
                    variant="standard"
                    margin="normal"
                    // helperText="Ingrese un dni válido"
                    fullWidth
                    // error
                    required
                    value={formulario.dni}
                    onChange={(e) => setFormulario({ ...formulario, dni: e.target.value })}
                />
                {/* APODO */}
                <TextField
                    id="apodo"
                    label="apodo"
                    type='texto'
                    variant="standard"
                    margin="normal"
                    // helperText="Ingrese un apodo válido"
                    fullWidth
                    // error
                    required
                    value={formulario.apodo}
                    onChange={(e) => setFormulario({ ...formulario, apodo: e.target.value })}
                />
                {/*POSICION */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="posicionid">POSICIÓN</InputLabel>
                    <Select
                        labelId="posicionid"
                        id="posicion"
                        value={formulario.posicion}
                        onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                        label="Posicion"
                        required
                        fullWidth
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        <MenuItem value={0}>Arquero</MenuItem>
                        <MenuItem value={1}>Defensor</MenuItem>
                        <MenuItem value={2}>Mediocampista</MenuItem>
                        <MenuItem value={3}>Delantero</MenuItem>

                    </Select>
                </FormControl>
                {/* PIEHABIL */}
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="piehabilid">PIÉ HABIL</InputLabel>
                    <Select
                        labelId="piehabilid"
                        id="piehabil"
                        value={formulario.piehabil}
                        onChange={(e) => setFormulario({ ...formulario, piehabil: e.target.value })}
                        label="Piehabil"
                        fullWidth
                        required
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        <MenuItem value={0}>Derecho</MenuItem>
                        <MenuItem value={1}>Izquierdo</MenuItem>
                    </Select>
                </FormControl>
                <Box mt={2}  >
                    
                    <Button sx={{m:2}}  variant="contained" color="secondary"  type="submit" onSubmit={e => enviarInformacion(e)}>ENVIAR</Button >
                    <Button sx={{m:2}}  variant="contained" onClose={handleClose}>CANCELAR</Button>
                </Box>

            </Box>





        </>


    )
}