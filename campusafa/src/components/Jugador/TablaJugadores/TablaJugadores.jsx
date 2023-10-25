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
import { useParams } from "react-router";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan, grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModalEditarJugador } from "../ModalEditarJugador/ModalEditarJugador";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';






export function TablaJugadores() {

    const baseURL = 'http://localhost:3005';
    // datos de estudiantes

    const [formulario, setFormulario] =
        useState({ nombre: '', apellido: '', dni: '', apodo: '', posicion: '', pieHabil: '' });
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
    const enviarInformacion = async (e) => {
        e.preventDefault();
        // console.log(formulario);

        await axios.post(baseURL + '/api/v1/futbolista/futbolistas/', formulario)
            .then(async resp => {
                console.log(resp);

                // alert(resp.data.msj);
                setFormulario({

                    nombre: '',
                    apellido: '',
                    dni: '',
                    apodo: '',
                    posicion: '',
                    pieHabil: ''
                });


                if (resp.data.estado === 'OK') {


                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor: '#326fd1'
                    })

                    if (result.isConfirmed) {
                        BuscarTodosFutbolistas();

                    }
                }
            })

            .catch(error => {
                console.log('error ', error);
            });
    }
    // Modal/Dialogo para eliminar futbolistas
    const eliminarFutbolista = async (idFutbolista) => {
        await axios.delete(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista)
            .then(async resp => {
                console.log(resp.data);
                if (resp.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor: '#326fd1'
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

    const [openEd, setOpenEd] = React.useState(false);

    const handleCloseEditar = () => {
        setOpenEd(false);
    };
    //EDITAR JUGADORES
    const handleClickOpenEditar = (item) => {

        console.log(item)
        setFormulario({
            idFutbolista: item.idFutbolista,
            dni: item.dni,
            nombre: item.nombre,
            apellido: item.apellido,
            apodo: item.apodo,
            posicion: item.posicion,
            pieHabil: item.pieHabil,
            foto: item.foto
        })


        setOpenEd(true);//abrir el modal
    };
    // const [edFutbolista, setEdFutbolista] = useState([]);
    // const priEdicion = (idFutbolista) => {

    // if (edFutbolista.includes(idFutbolista)) {

    //     setEdFutbolista(edFutbolista.filter((rowId) => rowId !== idFutbolista));
    // } else {

    // const editFutbolista = edFutbolista.map(item => item.nombre === edFutbolista.nombre ?
    //     item.apellido === edFutbolista.apellido ?
    //     item.dni === edFutbolista.dni ?
    //     item.apodo === edFutbolista.apodo ?
    //     item.posicion === edFutbolista.posicion ?
    //     item.pieHabil === edFutbolista.pieHabil :
    //         setEdFutbolista({
    //             dni: item.dni,
    //             nombre: item.nombre,
    //             apellido: item.apellido,

    //             apodo: item.apodo,
    //             posicion: item.posicion,
    //             pieHabil: item.pieHabil
    //         })
    //     );



    // } 


    const BuscarIdFutbolistas = async (idFutbolista) => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista)
            .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);

            })
            .catch(error => {
                console.log(error);
            })
    }


    // const finEdicion = async (e) => {
    //     e.preventDefault();
    //     await axios.put(baseURL + '/api/v1/futbolista/futbolistas/', formulario)
    //         .then(async resp => {
    //             console.log(resp.data.dato);
    //             if (resp.data.estado === 'OK') {
    //                 const editado = formulario.map(item => item.nombre === formulario.nombre ? { nombre, apellido, dni, apodo, posicion, pieHabil } : item)
    //                 setFormulario(editado)
    //                 BuscarIdFutbolistas();
    // //             }
    //         }


    //         )
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
    // const editarEnviarFutbolista = async (idFutbolista) => {
    //     await axios.put(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista)
    //         .then(async resp => {
    //             console.log(resp.data.dato);


    //             if (resp.data.estado === 'OK') {
    //                 setFormulario({
    //                     dni: formulario.dni,
    //                     nombre: formulario.nombre,
    //                     apellido: formulario.apellido,

    //                     apodo: formulario.apodo,
    //                     posicion: formulario.posicion,
    //                     pieHabil: formulario.pieHabil
    //                 });
    //                 BuscarIdFutbolistas();

    // const result = await Swal.fire({
    //     text: resp.data.msj,
    //     icon: 'success',
    //     confirmButtonText: 'Listo',
    //     confirmButtonColor: '#326fd1'
    // })

    // if (result.isConfirmed) {
    //     BuscarIdFutbolistas();

    // }
    //             }
    //         }


    //         )
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

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
                                    <TextField
                                        id="filled-basic"
                                        label="Busqueda"
                                        variant="filled"
                                        fullWidth />
                                </Grid>


                            </Grid>

                            <TableContainer sx={{ boxShadow: 1 }} >
                                <Table >
                                    <TableHead sx={{ bgcolor: "#052035" }}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography sx={{ color: cyan[50] }} variant="h5" >JUGADOR</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">POSICIÓN</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">APODO</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">PIÉ HABIL</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">ACCIONES</Typography></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ bgcolor: grey[100] }}>
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
                                                    <TableCell component="td"><Typography variant="subtitle1">{item.pieHabil}</Typography></TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item lg={6}>

                                                                <Tooltip disableFocusListener title="Editar">
                                                                    <IconButton aria-label="editar"
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={() => handleClickOpenEditar(item)}


                                                                    // open={open}
                                                                    >
                                                                        <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {/* <ModalEditarJugador onClick={() => editarFutbolista(item.idFutbolista)} /> */}
                                                            </Grid>
                                                            <Grid item lg={6}>
                                                                <Tooltip disableFocusListener title="Eliminar">
                                                                    <IconButton aria-label="eliminar"
                                                                        onClick={() => eliminarFutbolista(item.idFutbolista)}>
                                                                        <DeleteForeverRoundedIcon fontSize="large" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            )))
                                                :
                                                <></>
                                        }

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Container >
            {/************************MODAL/DIALOGO NUEVO***********************************************************************************************************************************************************************************************/}
            <Dialog open={open} onClose={handleClose}   >
                <DialogTitle >Nuevo Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        onSubmit={e => enviarInformacion(e)}
                    >

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
                                value={formulario.posicion || ''}
                                onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                                label="Posicion"
                                required
                                fullWidth
                                defaultValue=""
                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                <MenuItem value={0}>Arquero</MenuItem>
                                <MenuItem value={1}>Defensor</MenuItem>
                                <MenuItem value={2}>Mediocampista</MenuItem>
                                <MenuItem value={3}>Delantero</MenuItem>

                            </Select>
                        </FormControl>
                        {/*Pie habil*/}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="pieHabilid">PIÉ HABIL</InputLabel>
                            <Select
                                labelId="pieHabilid"
                                id="pieHabil"
                                // helperText={error.message}
                                // error={error.error}
                                value={formulario.pieHabil || ''}
                                onChange={(e) => setFormulario({ ...formulario, pieHabil: e.target.value })}
                                label="Pié Habil"
                                required
                                fullWidth
                                defaultValue=""
                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                <MenuItem value={0}>Derecha</MenuItem>
                                <MenuItem value={1}>Izquierda</MenuItem>


                            </Select>
                        </FormControl>
                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" onClick={handleClose}
                            >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>

            {/********************MODAL/DIALOGO EDITAR************************************************************************************************************************************************************/}
            <Dialog open={openEd} onClose={handleCloseEditar} >
                <DialogTitle>Editar Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form"

                    // onClick={() => editarFutbolista(item.idFutbolista)}
                    // onSubmit={e => editarFutbolista(e)}
                    >

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
                                value={formulario.posicion || ''}
                                onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                                label="Posicion"
                                required
                                fullWidth
                                defaultValue=""
                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                <MenuItem value={0}>Arquero</MenuItem>
                                <MenuItem value={1}>Defensor</MenuItem>
                                <MenuItem value={2}>Mediocampista</MenuItem>
                                <MenuItem value={3}>Delantero</MenuItem>

                            </Select>
                        </FormControl>
                        {/*PIE HABIL */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="pieHabilid">PIÉ HABIL</InputLabel>
                            <Select
                                labelId="pieHabilid"
                                id="pieHabil"
                                // helperText={error.message}
                                // error={error.error}
                                value={formulario.pieHabil || ''}
                                onChange={(e) => setFormulario({ ...formulario, pieHabil: e.target.value })}
                                label="Pié Habil"
                                required
                                fullWidth


                            >
                                <MenuItem value="">
                                    <em>Seleccionar</em>
                                </MenuItem>
                                <MenuItem value={0}>Derecha</MenuItem>
                                <MenuItem value={1}>Izquierda</MenuItem>


                            </Select>
                        </FormControl>
                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained"
                                // onSubmit={e => editarEnviarFutbolista(e)} 
                                color="secondary" type="submit" onClick={handleCloseEditar} >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseEditar}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>


        </>
    )
}
