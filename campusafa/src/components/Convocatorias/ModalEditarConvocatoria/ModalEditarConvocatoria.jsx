import React from "react";
import { useNavigate } from 'react-router-dom';
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

export function ModalEditarConvocatoria() {
    const baseURL = 'http://localhost:3005';


    const navigate = useNavigate();
    const [rivales, setRivales] = useState(null);


    const [convocatorias, setConvocatorias] = useState(null);

    const [convocatoria, setConvocatoria] = useState({ fecha: '', rival: '', golesRecibidos: '', golesConvertidos: '' });

    const crearConvocatoria = async (e) => {
        e.preventDefault();
        // console.log(convocatoria);

        await axios.post(baseURL + '/api/v1/convocatoria/nuevaconvocarotia', convocatoria)
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
    const buscarRivales = async () => {
        axios.get(baseURL + '/api/v1/rival/rivales')
            .then(resp => {
                setRivales(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const handleClickOpenConvocatoria = () => {
            buscarRivales()
            setOpenConv(true);
        };
    
        const handleCloseConvocatoria = () => {
            setOpenConv(false);
        };
    // Inicio del modal
    const [openconv, setOpenConv] = React.useState(false);
    //AGREGAR JUGADORES
    const handleClickOpenEditarConvocaroria = () => {
        buscarRivales()
        setOpenConv(true);
    };

    const handleCloseEditarConvocatoria = () => {
        setOpenConv(false);
    };


    return (
        <>
            <Tooltip disableFocusListener title="Editar">
                <IconButton aria-label="editar"
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpenEditarConvocaroria}
                >
                    <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            <Dialog className="editar" open={openconv} onClose={handleCloseEditarConvocatoria}>
                <DialogTitle >Editar Jugador</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={e => crearConvocatoria(e)} onClose={handleCloseEditarConvocatoria} >

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
                            onChange={(e) => setConvocatorias({ ...convocatoria, fecha: e.target.value })}
                        />
                    
                        <Box mt={2}  >
                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseEditarConvocatoria}>CANCELAR</Button>
                        </Box>
                    </Box>
                </DialogContent>

            </Dialog>
        </>
    )
}