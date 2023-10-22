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
    FormControl, MenuItem, InputLabel, Select, Tooltip, IconButton, containerClasses

} from "@mui/material";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import { useState, useEffect } from "react";
import axios from "axios";

export function ModalEditarConvocatoria(idConvocatoria) {
    
    
    const baseURL = 'http://localhost:3005';


    const navigate = useNavigate();
    
    
    const [rivales, setRivales] = useState(null);



    const [convocatoria, setConvocatoria] = useState({ 
        fecha: '', 
        rival: '', 
        golesRecibidos: '', 
        golesConvertidos: '' });

   
    useEffect(() => {
        BuscarTodosConvocatorias();
    }, []);

    const BuscarTodosConvocatorias = async () => {
        
        axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
            .then(resp => {
                setConvocatoria(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    };
  
    //Busqueda 
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

    const handleClickOpenEditarConvocaroria = () => {
       
        buscarRivales()
        setOpenConv(true);
    };

    const handleCloseEditarConvocatoria = () => {
        setOpenConv(false);
    };

    const editarConvocatoria = async (idConvocatoria) =>{
       
        await axios.put(baseURL + '/api/v1/convocatoria/esditarconvocatoria/'+ idConvocatoria, convocatoria)
            .then( async (resp) => {
                if (resp.data.estado === 'OK') {
                setConvocatoria(
                    resp.data.estado
                );

                BuscarTodosConvocatorias();
            }
            })
            .catch(error => {
                console.log(error);
            })
    }
 
  
    return (
        <>
        {/*************** BOTÓN DE EDITAR *****************************/}
            <Tooltip disableFocusListener title="Editar">
                <IconButton aria-label="editar"
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpenEditarConvocaroria}
                >
                    <DriveFileRenameOutlineRoundedIcon fontSize="large" />
                </IconButton>
            </Tooltip>
        {/****************** MODAL DE EDITAR *****************************/}

            <Dialog className="editar" open={openconv} onClose={handleCloseEditarConvocatoria}>
                <DialogTitle >Editar Convocatoria</DialogTitle>
                <DialogContent>
                    <Box component="form" >

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
                            required
                            fullWidth
                            value={convocatoria.fecha}
                            onChange={(e) => setConvocatoria({ ...convocatoria, fecha: e.target.value })}
                        />

                        {/*************** RIVAL ******************/}
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
                    {/******************BOTON CIERRE *****************************/}
                        <Box mt={2}  >
                        {/******************BOTON GUARDAR *****************************/}

                            <Button sx={{ m: 2 }} 
                            variant="contained" 
                            color="secondary" 
                            type="submit" 
                            onSubmit= {(item) => editarConvocatoria(item.idConvocatoria)}
                            >GUARDAR</Button >
                    
                        {/******************BOTON CANCELAR *****************************/}
        
                            <Button sx={{ m: 2 }} v
                            ariant="contained" 
                            onClick={handleCloseEditarConvocatoria}>CANCELAR</Button>
                        </Box>
                    </Box>
                </DialogContent>

            </Dialog>
        </>
    )
}