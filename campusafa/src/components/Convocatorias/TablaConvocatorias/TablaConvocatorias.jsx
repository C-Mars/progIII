import React from "react";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
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
    FormControl, MenuItem, InputLabel, Select, NativeSelect

} from "@mui/material";
import {  useContext,useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan, grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { Convocar } from '../Convocar/Convocar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UserContext } from '../../UserContext/UserContext';




export function TablaConvocatorias() {

    const baseURL = 'http://localhost:3005';

    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();


    const [rivales, setRivales] = useState(null);


    const [convocatorias, setConvocatorias] = useState([]);

    const [convocatoria, setConvocatoria] = useState({ fecha: '', rival: '', golesRecibidos: toString(''), golesConvertidos: toString('') });

    const [open, setOpen] = React.useState(false);
    //Guarda los datos del resultado de la busqueda utilizando(asociando) los datos todos los jugadores 
    const [resultados, setResultados] = useState(convocatorias);
    const handleClickOpen = () => {
        buscarRivales()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        BuscarTodosConvocatorias();
        buscarRivales()
    }, []);

    useEffect(() => {
        setResultados(convocatorias);
    }, [convocatorias]);

    const BuscarTodosConvocatorias = async () => {
        await axios.get(baseURL + '/api/v1/convocatoria/convocatorias/',{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            } 
        })
            .then(resp => {
                console.log(resp.data.dato);
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

    const crearConvocatoria = async () => {
        try {
            const resp = await axios.post(baseURL + '/api/v1/convocatoria/convocatorias', convocatoria,{
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                } 
            });
    
            if (resp.data.estado === 'OK') {
                handleClose();
                const result = await Swal.fire({
                    text: resp.data.msj,
                    icon: 'success',
                    confirmButtonText: 'Listo',
                    confirmButtonColor: '#326fd1'
                });
    
                if (result.isConfirmed) {
                    BuscarTodosConvocatorias();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
  
        const buscar = (termino) => {
            if (termino) {
               
                // filtrar los datos
                const resultadosFiltrados = convocatorias.filter((item) => {
                    // Según:
                    return (
                        //convierte el valor de dni a string para poder realizar la busqueda
                        item.fecha.toString().includes(termino) 
                       
                    );
                });
                // Actualiza con los resultados filtrados
                setResultados(resultadosFiltrados);
            } else {
                //Muestra todos los resultados
                setResultados(convocatorias);

            }
        };



        // Modal/Dialogo para eliminar convocatorias

        const eliminarConvocatoria = async (idConvocatoria) => {
            await axios.delete(baseURL + '/api/v1/convocatoria/convocatorias/' + idConvocatoria,{
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                } 
            })
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
                            BuscarTodosConvocatorias();

                        }
                    }


                    // setOpen(true)
                    // alert(resp.data.msj);

                })
                .catch(error => {
                    console.log(error);
                })
        };
        //Busqueda 
        const convocar = (id) => {
            const parametro = id; 
            navigate(`/privado/convocar/${parametro}`);        
        };

        const convocados = (idConvocatoria, rival) => {
            navigate(`/privado/convocados/${idConvocatoria}/${rival}`);        
        };
        const buscarRivales = async () => {
            axios.get(baseURL + '/api/v1/rival/rivales',{
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                } 
            })
                .then(resp => {
                    console.log(resp.data.dato)
                    setRivales(resp.data.dato);
                })
                .catch(error => {
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



        const handleCloseEditarConvocatoria = () => {
            setOpenConv(false);
        };

        //EDITAR Convocatoria carga los datos al modal/dialog
        const editarConvocatoria = (item) => {

            console.log(item);
            if (item.idConvocatoria && item.fecha && item.rival) {
                setConvocatoria({
                    // ...convocatoria,
                    idConvocatoria: item.idConvocatoria,
                    fecha: item.fecha,
                    rival: item.rival

                });

                handleClickOpenConvocatoria();
            }
        };






        const editarEnviarConvocatoria = async () => {
            const { idConvocatoria, fecha, rival, golesRecibidos, golesConvertidos } = convocatoria;
        
            try {
                const resp = await axios.put(baseURL + '/api/v1/convocatoria/convocatorias/' + idConvocatoria,{
                    headers:{
                        Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                    } 
                } ,{
                    idConvocatoria: idConvocatoria,
                    fecha: fecha,
                    rival: rival,
                    golesRecibidos: golesRecibidos,
                    golesConvertidos: golesConvertidos
                });
        
                if (resp.data.estado === 'OK') {
                    // Cierra el modal/dialog antes de mostrar Swal
                    handleCloseEditarConvocatoria();
                    
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor: '#326fd1'
                    });
        
                    if (result.isConfirmed) {
                        // Actualiza la lista
                        BuscarTodosConvocatorias();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

    const [openres, setOpenRes] = React.useState(false);



        const handleClickOpenResultados = () => {



            setOpenRes(true);

        };



        const handleCloseResultados = () => {

            setOpenRes(false);

        };


        //EDITAR Resultados carga los datos al modal/dialog

        const editarResultados = (item) => {
            console.log(item)
            setConvocatoria({
                idConvocatoria: item.idConvocatoria,
                golesRecibidos: item.golesRecibidos,
                golesConvertidos: item.golesConvertidos
            })

            handleClickOpenResultados();//muestra el modal

        };



        const editarEnviarResultados = async () => {

            const { idConvocatoria, fecha, rival, golesRecibidos, golesConvertidos } = convocatoria

            await axios.put(baseURL + '/api/v1/convocatoria/convocatorias/resultados/' + idConvocatoria,{
                headers:{
                    Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
                } 
            } ,{

                idConvocatoria: idConvocatoria,
                fecha: fecha,
                rival: rival,
                golesRecibidos: golesRecibidos.toString(),
                golesConvertidos: golesConvertidos.toString()

            })

                .then(async (resp) => {

                    console.log(resp.data.dato);



                    if (resp.data.estado === 'OK') {

                        const result = await Swal.fire({

                            text: resp.data.msj,
                            icon: 'success',
                            confirmButtonText: 'Listo',
                            confirmButtonColor: '#326fd1'

                        })



                        if (result.isConfirmed) {

                            //cierra el modal/dialog  

                            handleCloseResultados();

                            //actualiza la lista

                            BuscarTodosConvocatorias();

                        }



                    }

                })

                .catch(error => {

                    console.log(error);

                })

        }

    return(
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
                                        onClick={handleClickOpen}
                                    >Agregar</Button>
                                </Grid>
                                <Grid xs={8} item marginBottom={2}>
                                    <TextField
                                        id="filled-basic"
                                        label="Busqueda"
                                        placeholder="Busqueda por: fecha"
                                        variant="filled"
                                        onChange={(e) => buscar(e.target.value)}
                                        fullWidth />
                                </Grid>
                            </Grid>
                            <TableContainer sx={{ boxShadow: 1 }}   >
                                <Table >
                                    <TableHead sx={{ bgcolor: "#052035" }}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography sx={{ color: cyan[50] }} variant="h5" >FECHA</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">RIVAL</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{ color: cyan[50] }} variant="h5">ACCIONES</Typography></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ bgcolor: grey[100] }}>
                                        {
                                                //Para poder aplicar los filtros de busqueda --> resultados estan asociadosa convocatorias
                                            resultados.length > 0 ? (resultados.map((item, index) => (
                                                <TableRow component="tr" key={index}>
                                                    <TableCell component="td"><Typography variant="h6">{formatoFecha(item.fecha)}</Typography></TableCell>
                                                    <TableCell component="td"><Typography variant="h6">{item.nombre}</Typography></TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Editar">
                                                                    <IconButton aria-label="editar"
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={() => editarConvocatoria(item)}
                                                                    >
                                                                        <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                                                                    </IconButton>
                                                                </Tooltip>


                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Eliminar">
                                                                    <IconButton aria-label="eliminar" onClick={() => eliminarConvocatoria(item.idConvocatoria)}>
                                                                        <DeleteForeverRoundedIcon fontSize="large" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Convocar">
                                                                    <IconButton aria-label="convocar"
                                                                        onClick={() => convocar(item.idConvocatoria)}
                                                                    >
                                                                        <SportsSoccerRoundedIcon fontSize="large" color="success" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Convocados">
                                                                    <IconButton aria-label="convocados" onClick={() => convocados(item.idConvocatoria, item.fecha)}>
                                                                        <Groups2RoundedIcon fontSize="large" sx={{ color: cyan[500] }} />

                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Grid>
                                                            <Grid item lg={2} ml={1}>
                                                                <Tooltip disableFocusListener title="Resultados">
                                                                    <IconButton aria-label="resultados" onClick={() => editarResultados(item)}

                                                                    >
                                                                        <ArticleRoundedIcon fontSize="large" sx={{ color: cyan[700] }} />
                                                                    </IconButton>
                                                                </Tooltip>


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

            <Dialog className="NuevaConvocatoria" open={open}
                
            >
                <DialogTitle>Nueva Convocarotia</DialogTitle>
                <DialogContent>
                    <Box component="form" 
                    
                    onSubmit={e => crearConvocatoria(e)}
                    
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
                            {
                                convocatoria.rival !== undefined &&
                                <Select
                                    defaultValue=""

                                    required

                                    fullWidth
                                    onChange={(e) => setConvocatoria({ ...convocatoria, rival: e.target.value })}

                                >
                                    {(rivales?.length > 0) ? rivales.map(item => (
                                        <MenuItem key={item.idRival} value={item.idRival}>
                                            {item.nombre}
                                        </MenuItem>
                                    )) : <></>}
                                </Select>}






                        </FormControl>

                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit"
                            
                            >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog >


            <Dialog className="editar" open={openconv} onClose={handleCloseEditarConvocatoria}>
                <DialogTitle >Editar Convocatoria</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        onSubmit={(item) => editarEnviarConvocatoria(item.idConvocatoria)}
                    >

                        {/********** FECHA ********************/}
                        {/***** INGRESAR FECHA *********/}
                        <TextField
                            id="fecha"
                            label="Fecha"
                            type='date'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            key={convocatoria.fecha}
                            required
                            fullWidth
                            value={convocatoria.fecha}
                            onChange={(e) => setConvocatoria({ ...convocatoria, fecha: e.target.value })}
                        />

                        {/*************** RIVAL ******************/}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="rivalid">RIVAL</InputLabel>
                            {
                                convocatoria.rival !== undefined &&
                                <Select
                                    defaultValue=""
                                    required

                                    fullWidth
                                    onChange={(e) => setConvocatoria({ ...convocatoria, rival: e.target.value })}

                                >
                                    {(rivales?.length > 0) ? rivales.map(item => (
                                        <MenuItem key={item.idRival} value={item.idRival}>
                                            {item.nombre}
                                        </MenuItem>
                                    )) : <></>}
                                </Select>}
                        </FormControl>
                        {/******************BOTON CIERRE *****************************/}
                        <Box mt={2}  >
                            {/******************BOTON GUARDAR *****************************/}

                            <Button sx={{ m: 2 }}
                                variant="contained"
                                color="secondary"
                                type="submit"

                            >GUARDAR</Button >

                            {/******************BOTON CANCELAR *****************************/}

                            <Button sx={{ m: 2 }} variant="contained"
                                onClick={handleCloseEditarConvocatoria}>CANCELAR</Button>
                        </Box>
                    </Box>
                </DialogContent>

            </Dialog>
    {/***************************************************Resusultados*******************************/ }
    <Dialog className="editar" open={openres}
        onClose={handleCloseResultados}>
        <DialogTitle >Resultados</DialogTitle>
        <DialogContent>
            <Box component="form"
                onSubmit={e => editarEnviarResultados(e)} >

                {/* Goles Recibidos */}
                <TextField
                    id="golesrecibidos"
                    label="Goles Recibidos"
                    type='number'
                    variant="standard"
                    margin="normal"

                    required
                    fullWidth
                    value={convocatoria.golesRecibidos}
                    onChange={(e) => setConvocatoria({ ...convocatoria, golesRecibidos: e.target.value })}
                />
                {/* Goles CONVERTIDOS */}
                <TextField
                    id="golesconvertidos"
                    label="Goles Convertidos"
                    type='number'
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth

                    value={convocatoria.golesConvertidos}
                    onChange={(e) => setConvocatoria({ ...convocatoria, golesConvertidos: e.target.value })}
                />

                <Box mt={2}  >

                    <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" >GUARDAR</Button >
                    <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseResultados}>CANCELAR</Button>
                </Box>

            </Box>
        </DialogContent>

    </Dialog>

        </>
    )
}
