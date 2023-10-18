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
// import './TablaJugadores.css'

import ModalAgregarJugadores from "./ModalAgregarConvocatoria";
import  ModalEditarJugadores  from "../Jugador/ModalEditarJugadores";


export function TablaConvocatorias() {

//     const baseURL = 'http://localhost:3005';
//     // datos de estudiantes
//     const [datos, setDatos] = useState("");


//     useEffect(() => {
//         BuscarTodosConvocatorias();
//     }, []);

//     const BuscarTodosConvocatorias = async () => {
//         await axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
//             .then(resp => {
//                 console.log(resp.data.dato);
//                 setDatos(resp.data.dato);

//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }

    // Modal/Dialogo para eliminar Convocatorias
    // const eliminarConvocatoria = async (idConvocatoria) => {
    //     await axios.delete(baseURL + '/api/v1/convocatoria/convocatorias/' + idConvocatoria)
    //         .then(resp => {
    //             console.log(resp.data);

    //             BuscarTodosConvocatorias();
    //             alert(resp.data.msj);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }
    //Busqueda 
    


    return (
        <>
            <Container >
                <Box component="div">
                    <Card >
                        <CardContent >
                            <ModalAgregarJugadores/>
                            <TableContainer sx={{ maxHeight: 500 }}>
                                <Table >
                                    <TableHead >
                                        <TableRow component="tr">
                                            <TableCell component="td">FECHA</TableCell>
                                            <TableCell component="td">RIVAL</TableCell>
                                            <TableCell component="td">ACCIONES</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            // datos ? (datos.map((item, index) => (
                                            //     <TableRow component="tr" key={index}>
                                                    
                                            //         <TableCell component="td">{item.fecha}</TableCell>
                                            //         <TableCell component="td">{item.rival}</TableCell>
                                                   
                    
                                            //         <TableCell component="td">
                                            //             {/* <Button label="Editar" raised /> */}
                                            //             <Tooltip disableFocusListener title="Editar">
                                            //                 <IconButton aria-label="editar" >
                                            //                     <DriveFileRenameOutlineRoundedIcon />
                                            //                 </IconButton>
                                            //             </Tooltip>
                                            //             <Tooltip disableFocusListener title="Eliminar">
                                            //                 <IconButton aria-label="eliminar" 
                                            //                 // onClick={() => eliminarConvocatoria(item.idConvocatoria)}
                                            //                 >
                                            //                     <DeleteForeverRoundedIcon color="error" />
                                            //                 </IconButton>
                                            //             </Tooltip>
                                            //             <Tooltip disableFocusListener title="Convocar">
                                            //                 <IconButton aria-label="convocar">
                                            //                     <SportsSoccerRoundedIcon color="success" />
                                            //                 </IconButton>
                                            //             </Tooltip>
                                            //         </TableCell>
                                            //     </TableRow>
                                            // )))
                                            //     :
                                            //     (
                                            //         <tr>
                                            //             {/* TAREA: un mensaje o similar  */}
                                            //         </tr>
                                            //     )
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