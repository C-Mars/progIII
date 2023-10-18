import React from "react";
import {

    Box,
    Card,
    CardContent,
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
    Typography

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import ModalAgregarJugadores from "./ModalAgregarJugadores";
import ModalEditarJugadores from "./ModalEditarJugadores";





export function TablaJugadores() {

    const baseURL = 'http://localhost:3005';
    // datos de estudiantes
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
            .then(resp => {
                console.log(resp.data);

                BuscarTodosFutbolistas();
                alert(resp.data.msj);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Busqueda 



    return (
        <>
            <Container >
                <Box component="div">
                    <Card >
                        <CardContent >

                            <Grid container  spacing={2}>
                                <Grid xs={4} item mt={1} >
                                    <ModalAgregarJugadores />
                                </Grid>
                                <Grid xs={8} item marginBottom={2}>
                                    <TextField id="filled-basic" label="Filled" variant="filled" fullWidth />
                                </Grid>


                            </Grid>

                            <TableContainer sx={{ boxShadow: 1 }} >
                                <Table >
                                    <TableHead  sx={{bgcolor : "#052035"}}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography color="white"variant="h5" >JUGADOR</Typography></TableCell>
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
                                                                <ModalEditarJugadores />
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





        </>
    )
}
