import React from "react";
import {
    Box,
    Dialog,
    CardContent,
    DiDialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CardHeader,
    Container,
    Table,
    TableHead, Avatar,
    TableCell,
    TableContainer,
    Button,
    TableRow,
    ButtonBase,
    TableBody,
    TextField,
    Grid,
    Typography,
    FormControl, MenuItem, InputLabel, Select, Tooltip, IconButton

} from "@mui/material";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useState, useEffect } from "react";
import axios from "axios";

export function ModalEditarJugador() {

    const baseURL = 'http://localhost:3005';

    const [open, setOpen] = React.useState(false);

    const handleClickOpenEditar = () => {
        BuscarIdFutbolistas()
        setOpen(true);
    };

    const handleCloseEditar = () => {
        setOpen(false);
    };
    const [formulario, setFormulario] =
        useState({ nombre: '', apellido: '', dni: '', apodo: '', posicion: '', piehabil: '' });
    const [datos, setDatos] = useState("");
    useEffect(() => {
        BuscarIdFutbolistas();
    }, []);

    const BuscarIdFutbolistas = async (idFutbolista) => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas' + idFutbolista)
            .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);

            })
            .catch(error => {
                console.log(error);
            })
    }
    const editarFutbolista = async (idFutbolista) => {
        // idFutbolista.preventDefault();
        await axios.put(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista, formulario)
            .then(resp => {
                console.log(resp.data.dato);
                setFormulario(
                    resp.data.dato
                );
                BuscarIdFutbolistas();
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <Tooltip disableFocusListener title="Editar">
                <IconButton aria-label="editar"
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpenEditar}
                >
                    <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleCloseEditar}>
                <DialogTitle>Editar Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        onSubmit={e => editarFutbolista(e)}

                        // onSubmit={e => editarFutbolista(e)}
                        onClose={handleCloseEditar} >

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
                        {/*PIE HABIL */}
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

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseEditar}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>

        </>
    )
}