import React from "react";
import {

    Box,
    Card,
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
    FormControl, MenuItem, InputLabel, Select, 

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { ModalEditarJugador } from "../ModalEditarJugador/ModalEditarJugador";






export function TablaJugadores() {

    const baseURL = 'http://localhost:3005';
    // datos de estudiantes

    const [formulario, setFormulario] =
        useState({ nombre: '', apellido: '', dni: '', apodo: '', posicion: '', piehabil: '' });
    // Buscar futbolistas lista actualizada
    const [datos, setDatos] = useState("");


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

    // Modal/Dialogo para eliminar futbolistas
    const eliminarFutbolista = async (idFutbolista) => {
        await axios.delete(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista)
            .then( async resp => {
                console.log(resp.data);
                if (resp.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor:'#326fd1'
                    })

                    if (result.isConfirmed) {
                        BuscarTodosFutbolistas();
                        
                    }
                }
                
               
                // setOpen(true)
                // alert(resp.data.msj);
                
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
    //AGREGAR JUGADORES
    const handleClickOpen = () => {
        BuscarTodosFutbolistas()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //EDITAR JUGADORES
    const handleClickOpenEditar = () => {
        BuscarTodosFutbolistas()
        setOpen(true);
    };
    return (
        <>
            <Container >
                <Box component="div">
                    <Card >
                        <CardContent >

                            <Grid container spacing={2}>
                                <Grid xs={4} item mt={1} >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddBoxRoundedIcon />}
                                        onClick={handleClickOpen}
                                    >Agregar</Button>
                                </Grid>
                                <Grid xs={8} item marginBottom={2}>
                                    <TextField id="filled-basic" label="Filled" variant="filled" fullWidth />
                                </Grid>


                            </Grid>

                            <TableContainer sx={{ boxShadow: 1 }} >
                                <Table >
                                    <TableHead sx={{ bgcolor: "#052035" }}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography color="white" variant="h5" >JUGADOR</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">POSICIÓN</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">APODO</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">PIÉ HABIL</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">ACCIONES</Typography></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            datos ? (datos.map((item, index) => (
                                                <TableRow component="tr" key={index}>

                                                    <TableCell component="td" ailing="right">

                                                        <Grid container spacing={2} ailing="center">
                                                            <Grid item lg={4} mt={2} >
                                                                <Avatar
                                                                    sx={[{ width: 56, height: 56 },
                                                                    { bgcolor: cyan[700] }]}
                                                                    alt={item.nombre}
                                                                    rc={item.foto} />
                                                            </Grid>
                                                            <Grid item lg={8} >
                                                                <Typography variant="subtitle1">{item.nombre}</Typography>
                                                                <Typography variant="subtitle2"> {item.apellido}</Typography>
                                                                <Typography variant="body2">  {item.dni}</Typography>
                                                            </Grid>

                                                        </Grid>
                                                    </TableCell>

                                                    <TableCell component="td"><Typography variant="subtitle1">{item.posicion}</Typography></TableCell>
                                                    <TableCell component="td"><Typography variant="subtitle1">{item.apodo}</Typography></TableCell>
                                                    <TableCell component="td"><Typography variant="subtitle1">{item.piehabil}</Typography></TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item lg={6}>
                                                                <ModalEditarJugador />
                                                            </Grid>
                                                            <Grid item lg={6}>
                                                                <Tooltip disableFocusListener title="Eliminar">
                                                                    <IconButton aria-label="eliminar" onClick={() => eliminarFutbolista(item.idFutbolista)}>
                                                                        <DeleteForeverRoundedIcon fontSize="large" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>



                                                    </TableCell>
                                                </TableRow>
                                            )))
                                                :
                                                (
                                                    <TableRow>
                                                        {/* <Tooltip disableFocusListener title="Convocar">
                                                            <IconButton aria-label="convocar">
                                                                <SportsSoccerRoundedIcon color="success" />
                                                            </IconButton>
                                                        </Tooltip> */}
                                                    </TableRow>
                                                )
                                        }

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Container >

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle >Nuevo Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        onSubmit={e => enviarInformacion(e)}
                        onClose={handleClose} >

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

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>




        </>
    )
}
