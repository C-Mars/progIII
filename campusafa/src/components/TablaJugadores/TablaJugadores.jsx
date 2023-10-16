import React from "react";
import {

    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Table,

    TableCell,
    TableContainer,
    Button,
    TableRow,
    ButtonBase,
    TableBody,

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { TableHead } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import './TablaJugadores.css'
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';
import ModalAgregarJugadores from "../ModalAgregarJugadores/ModalAgregarJugadores";



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
//  cartel de eliminado


    return (
        <>
            <Container >
                <Box component="div">
                    <Card >
                        <CardContent >
                            <ModalAgregarJugadores />
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table >
                                    <TableHead >
                                        <TableRow component="tr">
                                            <TableCell component="td">DNI</TableCell>
                                            <TableCell component="td">NOMBRE</TableCell>
                                            <TableCell component="td">APELLIDO</TableCell>
                                            <TableCell component="td">POSICIÓN</TableCell>
                                            <TableCell component="td">APODO</TableCell>
                                            <TableCell component="td">PIÉ HABIL</TableCell>
                                            <TableCell component="td">ACCIONES</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            datos ? (datos.map((item, index) => (
                                                <TableRow component="tr" key={index}>
                                                    <TableCell component="td">{item.dni}</TableCell>
                                                    <TableCell component="td">{item.nombre}</TableCell>
                                                    <TableCell component="td">{item.apellido}</TableCell>
                                                    <TableCell component="td">{item.posicion}</TableCell>
                                                    <TableCell component="td">{item.apodo}</TableCell>
                                                    <TableCell component="td">{item.piehabil}</TableCell>
                                                    <TableCell component="td">
                                                        {/* <Button label="Editar" raised /> */}
                                                        <Tooltip disableFocusListener title="Editar">
                                                            <IconButton aria-label="editar">
                                                                <DriveFileRenameOutlineRoundedIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip disableFocusListener title="Eliminar">
                                                            <IconButton aria-label="eliminar" onClick={() => eliminarFutbolista(item.idFutbolista)}>
                                                                <DeleteForeverRoundedIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip disableFocusListener title="Convocar">
                                                            <IconButton aria-label="convocar">
                                                                <SportsSoccerRoundedIcon color="success" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            )))
                                                :
                                                (
                                                    <tr>
                                                        {/* TAREA: un mensaje o similar  */}
                                                    </tr>
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
