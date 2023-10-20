import React from "react";
import { useNavigate } from 'react-router-dom';
import {

    Box,
    Card,
    Dialog,
    DiDialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
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
    Typography,
    FormControl, MenuItem, InputLabel, Select,NativeSelect

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { ModalEditarConvocatoria } from "../ModalEditarConvocatoria/ModalEditarConvocatoria";
import { Convocar} from '../Convocar/Convocar'
import { ModalResultados } from "../ModalResultados/ModalResultados";





export function TablaConvocatorias() {

    const baseURL = 'http://localhost:3005';


    const navigate = useNavigate();
    const [rivales, setRivales] = useState(null);


    const [convocatorias, setConvocatorias] = useState(null);

    const [convocatoria, setConvocatoria] = useState({ fecha: '', rival: '', golesRecibidos: '', golesConvertidos: '' });

    const crearConvocatoria = async (e) => {
        e.preventDefault();
        // console.log(convocatoria);

        await axios.post(baseURL + '/api/v1/convocatoria/nuevaconvocatoria', convocatoria)
            .then(res => {
                if (res.data.estado === 'OK') {
                    alert(res.data.msj);
                    handleCloseConvocatoria();
                    BuscarTodosConvocatorias();
                }
            })
            .catch(error => {
                console.log(error);
            })

    }


    // Inicio del modal
    // datos de convocatoria


    // datos de los rivales disponibles



    useEffect(() => {
        BuscarTodosConvocatorias();
    }, []);

    const BuscarTodosConvocatorias = async () => {
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
            .then(resp => {
                setConvocatorias(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    };

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
    };
    //Busqueda 
    const convocar = (id) => {
        const parametro = id;
        navigate(`/convocar/${parametro}`);
    };

    const convocados = (idConvocatoria, rival) => {
        // const idConvocatoria = idConvocatoria; 
        navigate(`/convocados/${idConvocatoria}/${rival}`);
    };
    const buscarRivales = async () =>{
        axios.get(baseURL + '/api/v1/rival/rivales')
            .then( resp => {
                console.log(resp.data.dato)
                setRivales(resp.data.dato);
            })
            .catch( error => {
                console.log(error);
        });
    }
    // Inicio del modal
    const [openconv, setOpenConv] = React.useState(false);
    //AGREGAR JUGADORES
    const handleClickOpenConvocatoria = () => {
        buscarRivales()
        setOpenConv(true);
    };

    const handleCloseConvocatoria = () => {
        setOpenConv(false);
    };


    return (
        <>
            <Container >
                <Box component="div">
                    <Card sx={{ minHidth: 900 }}>
                        <CardContent >
                            <Grid container spacing={2}>
                                <Grid xs={4} item mt={1} >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddBoxRoundedIcon />}
                                        onClick={handleClickOpenConvocatoria}
                                    >Agregar</Button>
                                </Grid>
                                <Grid xs={8} item marginBottom={2}>
                                    <TextField id="filled-basic" label="Filled" variant="filled" fullWidth />
                                </Grid>
                            </Grid>
                            <TableContainer sx={{ boxShadow: 1 }}   >
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
                                                            <Grid item lg={2} ml={1}>
                                                                <ModalEditarConvocatoria/>
                                                                
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Eliminar">
                                                                    <IconButton aria-label="eliminar" onClick={() => eliminarConvocatoria(item.idConvocatoria)}>
                                                                        <DeleteForeverRoundedIcon fontSize="large" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Convocar/>
                                                                
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Convocados">
                                                                    <IconButton aria-label="convocados" onClick={() => convocados(item.idConvocatoria, item.fecha)}>
                                                                        <Groups2RoundedIcon fontSize="large" sx={{ color: cyan[500] }} />

                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <ModalResultados/>
                                                                
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            )))
                                                : <></>
                                        }

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Box>
            </Container >

            <Dialog className="NuevaConvocatoria" open={openconv} 
            onClose={handleCloseConvocatoria}
            >
                <DialogTitle>Nueva Convocarotia</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={e => crearConvocatoria(e)} 
                    // onClose={handleCloseConvocatoria} 
                    >

                        {/* fecha */}
                        <TextField
                            id="fecha"
                            label="Fecha"
                            type='date'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            required
                            fullWidth
                            value={convocatoria.fecha}
                            onChange={(e) => setConvocatoria({ ...convocatoria, fecha: e.target.value })}
                        />


                        {/*POSICION */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="rivalid">RIVAL</InputLabel>
                            <Select
                                required
                                value={convocatoria.idRival}
                                fullWidth
                                onChange={(e) => setConvocatoria({ ...convocatoria, rival:e.target.value })}
                            
                            >
                                { (rivales?.length > 0) ? rivales.map(item => (
                                            <MenuItem key={item.idRival} value={item.idRival}>
                                                {item.nombre}
                                            </MenuItem>
                                        )) : <></>}     
                            </Select>





                    
                        </FormControl>

                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" 
                            // onClick={() => setOpenConv(false)}
                            >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseConvocatoria}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>

            




        </>
    )
}