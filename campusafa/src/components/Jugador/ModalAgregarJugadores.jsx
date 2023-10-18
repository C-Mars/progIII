import React from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, FormControl, MenuItem, InputLabel, Select, Button

} from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useState, useEffect } from "react";
import axios from "axios";

export function ModalAgregarJugadores() {

    // Nuevo futbolista
    const baseURL = 'http://localhost:3005';
    // Guarda la info
    const [formulario, setFormulario] =
        useState({  nombre: '',apellido:'',dni:'', apodo: '', posicion: '',piehabil: '' });
    // Buscar futbolistas lista actualizada
    // datos de futbolistas
    const [datos, setDatos] = useState([]);
    // Error validacion
    // const [error, setError] = useState({
    //     error: false,
    //     message: ""
    // })

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

        await axios.post(baseURL + '/api/v1/futbolista/futbolistas', formulario)
            .then(res => {
                console.log(res);
                // alert(res.data.msj);
                setFormulario({
                   
                    nombre: '',
                    apellido: '',
                    dni: '',
                    apodo: '', 
                    posicion: '',
                    piehabil: ''
                });
                BuscarTodosFutbolistas();
            })

            .catch(error => {
                console.log('error ', error);
            });
    }
    // Inicio del modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<AddBoxRoundedIcon />}
                onClick={handleClickOpen}
            >Agregar</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nuevo Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={e => enviarInformacion(e)} onClose={handleClose} >
                       
                        {/* NOMBRE */}
                        <TextField
                            id="nombre"
                            label="Nombre"
                            type='text'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            required
                            fullWidth
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
                            // helperText={error.message}
                            // error={error.error}
                            fullWidth
                            required
                            value={formulario.apellido}
                            onChange={(e) => setFormulario({ ...formulario, apellido: e.target.value })}
                        />
                         {/* DNI */}
                         <TextField
                            id="dni"
                            label="DNI"
                            type='number'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            fullWidth

                            required
                            value={formulario.dni}
                            onChange={(e) => setFormulario({ ...formulario, dni: e.target.value })}
                        />
                        {/* APODO */}
                        <TextField
                            id="apodo"
                            label="Apodo"
                            type='texto'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
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
                                // helperText={error.message}
                                // error={error.error}
                                value={formulario.posicion}
                                onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                                label="Posicion"
                                required
                                fullWidth
                            >
                                
                                <MenuItem value={0}>Arquero</MenuItem>
                                <MenuItem value={1}>Defensor</MenuItem>
                                <MenuItem value={2}>Mediocampista</MenuItem>
                                <MenuItem value={3}>Delantero</MenuItem>

                            </Select>
                        </FormControl>
                        {/*Pie habil*/}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="piehabilid">PIÉ HABIL</InputLabel>
                            <Select
                                labelId="piehabilid"
                                id="piehabil"
                                // helperText={error.message}
                                // error={error.error}
                                value={formulario.piehabil}
                                onChange={(e) => setFormulario({ ...formulario, piehabil: e.target.value })}
                                label="Pié Habil"
                                required
                                fullWidth
                            >
                                
                                <MenuItem value={0}>Derecha</MenuItem>
                                <MenuItem value={1}>Izquierda</MenuItem>
                                

                            </Select>
                        </FormControl>
                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" onClick={() => setOpen(false)}>ENVIAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>
        </div>
    );
}
export default ModalAgregarJugadores