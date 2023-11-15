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
import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan, grey } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { UserContext } from '../../UserContext/UserContext';




export function TablaJugadores() {

    const baseURL = 'http://localhost:3005';

    const { userData, setUserData } = useContext(UserContext);
    // Guarda los datos del Futbolista
    const [formulario, setFormulario] = useState({ nombre: '', apellido: '', dni: '', apodo: '', posicion: '', pieHabil: '', foto: '' });
    // Guarda los datos de todos los futbolistas 
    const [datos, setDatos] = useState("");
    //Guarda los datos del resultado de la busqueda utilizando(asociando) los datos todos los jugadores 
    const [resultados, setResultados] = useState(datos);
    //Actualiza la lista de todos los jugadores
    useEffect(() => {
        BuscarTodosFutbolistas();
    }, []);
    //Actualiza cada vez que hay una busqueda
    useEffect(() => {
        setResultados(datos);
    }, [datos]);


    //Busca todos los datos de los futbolista que se encuentra en la base de datos
    const BuscarTodosFutbolistas = async () => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas',{
        headers:{
            Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
        }
    })
           
        .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Busca los futbolistas por id 
    const BuscarIdFutbolistas = async (idFutbolista) => {
        await axios.get(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista, {
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
            
        .then(resp => {
                console.log(resp.data.dato);
                setDatos(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }
    /// Realiza la búsqueda y filtra los resultados en base al término de búsqueda que ingrese el usuario
    const buscar = (termino) => {
        if (termino) {
            // filtrar los datos
            const resultadosFiltrados = datos.filter((item) => {
                // Según:
                return (
                    //convierte el valor de dni a string para poder realizar la busqueda
                    item.dni.toString().includes(termino) ||
                    item.nombre.toLowerCase().includes(termino.toLowerCase()) ||
                    item.apellido.toLowerCase().includes(termino.toLowerCase()) ||
                    item.posicion.toLowerCase().includes(termino.toLowerCase())
                );
            });
            // Actualiza con los resultados filtrados
            setResultados(resultadosFiltrados);
        } else {
            //Muestra todos los resultados
            setResultados(datos);

        }
    };

    //AGREGAR FUTBOLISTA
    const [archivo, setArchivo] = useState(null);

    const enviarInformacion = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', formulario.nombre);
        formData.append('apellido', formulario.apellido);
        formData.append('dni', formulario.dni);
        formData.append('apodo', formulario.apodo);
        formData.append('posicion', formulario.posicion);
        formData.append('pieHabil', formulario.pieHabil);
        formData.append('foto', archivo); // Añade la foto al formulario

        await axios.post(baseURL + '/api/v1/futbolista/futbolistas/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Asegura que el tipo de contenido sea correcto
                'Authorization': `Bearer ${userData.token}` 
            },
        })

            .then(async resp => {
                console.log(resp);

                setFormulario({
                    nombre: '',
                    apellido: '',
                    dni: '',
                    apodo: '',
                    posicion: '',
                    pieHabil: '',

                });
                if (resp.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: resp.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor: '#326fd1'
                    })
                    if (result.isConfirmed) {
                        handleClose();
                        BuscarTodosFutbolistas();
                    }
                }
            })
            .catch(error => {
                console.log('error ', error);
            });
    }

    const changeArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };
    // Elimina futbolistas utilizando el id
    const eliminarFutbolista = async (idFutbolista) => {
        await axios.delete(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista,
        {
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
                        //actualiza la lista
                        BuscarTodosFutbolistas();
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    //AGREGAR FUTBOLISTAS
    // Para que se muestre el modal/dialog 
    const [open, setOpen] = React.useState(false);
    //Muestra modal
    const handleClickOpen = () => {
        // actualiza la lista antes de abrir el modal
        BuscarTodosFutbolistas()
        setOpen(true);
    };
    //Cierra
    const handleClose = () => {
        setOpen(false);
    };
    //EDITAR FUTBOLISTAS
    // Para que se muestre el modal/dialog 
    const [openEd, setOpenEd] = React.useState(false);
    //Muestra modal
    const handleCloseEditar = () => {
        setOpenEd(false);
    };

    //Valores que toma el select--> le indico lo que significa cada valor
    const opcionesPosicion = {
        'Arquero': 0,
        'Defensor': 1,
        'Mediocampista': 2,
        'Delantero': 3,
    };

    const opcionesPieHabil = {
        'Derecho': 0,
        'Izquierdo': 1,
    };

    //EDITAR futbolistas carga los datos al modal/dialog
    const editarJugador = (item) => {
        console.log(item)
        setFormulario({
            idFutbolista: item.idFutbolista,
            dni: item.dni,
            nombre: item.nombre,
            apellido: item.apellido,
            apodo: item.apodo,
            posicion: opcionesPosicion[item.posicion],//Muestra el texto del  valor numerico
            pieHabil: opcionesPieHabil[item.pieHabil],
            

        })
        setOpenEd(true);//muestra el modal
    };

    //Envia los Datos Actualizados del futbolista que queremos editar
    const editarEnviarFutbolista = async () => {
        const { idFutbolista, dni, nombre, apellido, apodo, posicion, pieHabil,
            foto
        } = formulario;
        await axios.put(baseURL + '/api/v1/futbolista/futbolistas/' + idFutbolista,{
            headers:{
                Authorization:`Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            } 
        } ,{
            idFutbolista: idFutbolista,
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            apodo: apodo,
            posicion: posicion,
            pieHabil: pieHabil
        })



            .then(async resp => {
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
                        handleCloseEditar();
                        //actualiza la lista
                        BuscarIdFutbolistas();

                    }
                }
            }
            )
            .catch(error => {
                console.log(error);
            })
    }



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
                                        placeholder="Busqueda por: nombre, apellido, DNI o posición"
                                        variant="filled"
                                        onChange={(e) => buscar(e.target.value)}
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
                                            //Para poder aplicar los filtros de busqueda --> resultados estan aspciados a datos
                                            resultados ? (resultados.map((item, index) => (
                                                <TableRow component="tr" key={index}>
                                                    <TableCell component="td" ailing="right">
                                                        <Grid container spacing={2} ailing="center">
                                                            <Grid item lg={4} mt={2} >
                                                                <Avatar
                                                                    sx={[{ width: 56, height: 56 },
                                                                    { bgcolor: cyan[700] }]}
                                                                    alt={item.nombre}
                                                                    src={`http://localhost:3005/archivos/${item.foto}`} />
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
                                                                        onClick={() => editarJugador(item)}
                                                                    >
                                                                        <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                                                                    </IconButton>
                                                                </Tooltip>

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
                            fullWidth
                            required
                            value={formulario.apodo}
                            onChange={(e) => setFormulario({ ...formulario, apodo: e.target.value })}
                        />
                        {/*POSICION */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="posicionid">POSICIÓN</InputLabel>
                            {formulario.posicion !== undefined &&
                                <Select
                                    defaultValue=""
                                    labelId="posicionid"
                                    id="posicionid"
                                    value={formulario.posicion}
                                    onChange={(e) => setFormulario({ ...formulario, posicion: e.target.value })}
                                    label="Posicion"
                                    required
                                    fullWidth
                                    key={formulario.posicion}

                                >

                                    <MenuItem value="0">Arquero</MenuItem>
                                    <MenuItem value="1">Defensor</MenuItem>
                                    <MenuItem value="2">Mediocampista</MenuItem>
                                    <MenuItem value="3">Delantero</MenuItem>

                                </Select>}
                        </FormControl>
                        {/*Pie habil*/}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="pieHabilid">PIÉ HABIL</InputLabel>
                            {formulario.pieHabil !== undefined &&
                                <Select
                                    defaultValue=""
                                    labelId="pieHabilid"
                                    id="pieHabilid"
                                    key={formulario.pieHabil}
                                    value={formulario.pieHabil}
                                    onChange={(e) => setFormulario({ ...formulario, pieHabil: e.target.value })}
                                    label="Pié Habil"
                                    required
                                    fullWidth

                                >
                                    <MenuItem value="0">Derecho</MenuItem>
                                    <MenuItem value="1">Izquierdo</MenuItem>


                                </Select>}
                        </FormControl>
                        <Box  >
                          <Box >
                          <input
                                    type="file"
                                    accept=" .jpg, .png"  // Puedes definir las extensiones permitidas
                                    style={{ display: 'none' }}
                                    id="file-input"
                                    onChange={changeArchivo}
                                    
                                />
                          </Box>
                                
                           <Box mt={2}>
                           <label htmlFor="file-input">
                                    <Button sx={{ m: 2 }} variant="contained" color="secondary" component="span" startIcon={<CloudUploadIcon />}>
                                        SELECCIONAR FOTO
                                    </Button>
                                </label>
                                <TextField
                                    label="Nombre del archivo"
                                    ariant="standar"
                                    value={archivo ? archivo.name : ''}
                                    disabled
                                />
                           </Box>
                        </Box>
                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" onClick={handleClose}
                            >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/********************MODAL/DIALOGO EDITAR************************************************************************************************************************************************************/}
            <Dialog open={openEd} onClose={handleCloseEditar}

            >
                <DialogTitle>Editar Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        onSubmit={(item) => editarEnviarFutbolista(item)}
                    >

                        {/* NOMBRE */}
                        <TextField
                            id="nombre"
                            label="Nombre"
                            type='text'
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            value={formulario.nombre}
                            onChange={(item) => setFormulario({ ...formulario, nombre: item.target.value })}
                        />
                        {/* APELLIDO */}
                        <TextField
                            id="apellido"
                            label="Apellido"
                            type='text'
                            variant="standard"
                            margin="normal"
                            fullWidth
                            required
                            value={formulario.apellido}
                            onChange={(item) => setFormulario({ ...formulario, apellido: item.target.value })}
                        />
                        {/* DNI */}
                        <TextField
                            id="dni"
                            label="DNI"
                            type='number'
                            variant="standard"
                            margin="normal"
                            fullWidth
                            required
                            value={formulario.dni}
                            onChange={(item) => setFormulario({ ...formulario, dni: item.target.value })}
                        />
                        {/* APODO */}
                        <TextField
                            id="apodo"
                            label="Apodo"
                            type='text'
                            variant="standard"
                            margin="normal"
                            fullWidth
                            required
                            value={formulario.apodo}
                            onChange={(item) => setFormulario({ ...formulario, apodo: item.target.value })}
                        />
                        {/*POSICION */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="posicionid">POSICIÓN</InputLabel>
                            {formulario.posicion !== undefined &&
                                <Select
                                    defaultValue=""
                                    labelId="posicionid"
                                    id="posicion"
                                    value={formulario.posicion}
                                    onChange={(item) => setFormulario({ ...formulario, posicion: item.target.value })}
                                    label="Posicion"
                                    required
                                    fullWidth
                                    key={formulario.posicion}
                                >
                                    <MenuItem value="0">Arquero</MenuItem>
                                    <MenuItem value="1">Defensor</MenuItem>
                                    <MenuItem value="2">Mediocampista</MenuItem>
                                    <MenuItem value="3">Delantero</MenuItem>

                                </Select>}
                        </FormControl>
                        {/*PIE HABIL */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="pieHabilid">PIÉ HABIL</InputLabel>
                            {formulario.pieHabil !== undefined &&
                                <Select
                                    defaultValue=""
                                    labelId="pieHabilid"
                                    id="pieHabil"
                                    value={formulario.pieHabil}
                                    onChange={(item) => setFormulario({ ...formulario, pieHabil: item.target.value })}
                                    label="Pié Habil"
                                    required
                                    fullWidth
                                    key={formulario.pieHabil}
                                >
                                    <MenuItem value="0">Derecho</MenuItem>
                                    <MenuItem value="1">Izquierdo</MenuItem>
                                </Select>}

                        </FormControl>

                        <Box mt={2}  >
                            <Button sx={{ m: 2 }} variant="contained"
                                color="secondary" type="submit" onClick={handleCloseEditar} >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseEditar}>CANCELAR</Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
