import React from "react";
import { useNavigate } from 'react-router-dom';
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
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { ModalAgregarConvocatoria } from "./ModalAgregarConvocatoria";
import { ModalEditarConvocatoria } from "./ModalEditarConvocatoria";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';






export function TablaConvocatorias() {

    const baseURL = 'http://localhost:3005';
   

    const navigate = useNavigate();

    // datos de convocatoria
    const [convocatorias, setConvocatorias] = useState(null);

    // datos de los rivales disponibles

    
    
    useEffect(()=>{
        BuscarTodosConvocatorias();
    },[]); 
    
    const BuscarTodosConvocatorias = async () => {
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
        .then( resp => {
            setConvocatorias(resp.data.dato);
        })
        .catch( error => {
            console.log(error);
    })
}
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    }
    
    // Modal/Dialogo para eliminar convocatorias

    const eliminarConvocatoria = async (idConvocatoria) => {
        await axios.delete(baseURL + '/api/v1/convocatoria/convocatorias/' + idConvocatoria)
            .then(resp => {
                console.log(resp.data);

                BuscarTodosConvocatorias();
                alert(resp.data.msj);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Busqueda 
    const convocar = (id) => {
        const parametro = id; 
        navigate(`/convocar/${parametro}`);        
    };

    const convocados = (idConvocatoria, rival) => {
        // const idConvocatoria = idConvocatoria; 
        navigate(`/convocados/${idConvocatoria}/${rival}`);        
    };
    
    // Inicio del modal
    const [open, setOpen] = React.useState(false);
    //AGREGAR JUGADORES
    const handleClickOpen = () => {
        BuscarTodosConvocatorias()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //EDITAR JUGADORES
    const handleClickOpenEditar = () => {
        BuscarTodosConvocatorias()
        setOpen(true);
    };

    const handleCloseEditar = () => {
        setOpen(false);
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
                                            <TableCell component="td" ><Typography color="white" variant="h5" >FECHA</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">RIVAL</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">ACCIONES</Typography></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            convocatorias ? (convocatorias.map((item, index) => (
                                                <TableRow component="tr" key={index}>



                                                    <TableCell component="td"><Typography variant="h6">{formatoFecha(item.fecha)}</Typography></TableCell>
                                                    <TableCell component="td"><Typography variant="h6">{item.nombre}</Typography></TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item lg={3}>
                                                            <Tooltip disableFocusListener title="Editar">
                                                                    <IconButton aria-label="editar"
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={handleClickOpenEditar}
                                                                    >
                                                                        <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Tooltip disableFocusListener title="Eliminar">
                                                                    <IconButton aria-label="eliminar" onClick={() => eliminarConvocatoria(item.idFutbolista)}>
                                                                        <DeleteForeverRoundedIcon fontSize="large" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Tooltip disableFocusListener title="Convocar">
                                                                    <IconButton aria-label="convocar" onClick={() => convocar(item.idConvocatoria)}>
                                                                        <SportsSoccerRoundedIcon fontSize="large" color="success" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Tooltip disableFocusListener title="Convocados">
                                                                    <IconButton aria-label="convocados"  onClick={() => convocados(item.idConvocatoria, item.nombre)}>
                                                                        <Groups2RoundedIcon fontSize="large" sx={{ color: cyan[500] }}/>
                            
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={3}>
                                                                <Tooltip disableFocusListener title="Resultados">
                                                                    <IconButton aria-label="resultados"  onClick={() => convocados(item.idConvocatoria, item.nombre)}>
                                                                        <ArticleRoundedIcon fontSize="large" sx={{ color: cyan[700] }}/>
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
