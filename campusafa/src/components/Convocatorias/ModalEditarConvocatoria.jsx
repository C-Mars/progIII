import React from "react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField, FormControl, MenuItem, InputLabel, Select, Button

} from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useState, useEffect } from "react";
import axios from "axios";

export function ModalAgregarConvocatoria() {

    // Nuevo futbolista
    const baseURL = 'http://localhost:3005';
    // Guarda la info
    const [formulario, setFormulario] =
        useState({  fecha: '',rival:'' });
    // Buscar futbolistas lista actualizada
    // datos de futbolistas
    const [datos, setDatos] = useState([]);
    // Error validacion
    // const [error, setError] = useState({
    //     error: false,
    //     message: ""
    // })

    useEffect(() => {
        BuscarTodosConvocatorias();
    }, []);

    const BuscarTodosConvocatorias = async () => {
        await axios.get(baseURL + '/api/v1/convocatoria/convocatorias')
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

        await axios.post(baseURL + '/api/v1/futbolista/futbolistas', formulario)
            .then(res => {
                console.log(res);
                // alert(res.data.msj);
                setFormulario({
                   
                    fecha: '',
                    rival: '',
                    
                });
                BuscarTodosConvocatorias();
            })

            .catch(error => {
                console.log('error ', error);
            });
    }
    // Inicio del modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip disableFocusListener title="Editar">
                <IconButton aria-label="editar"
                    variant="contained"
                    color="secondary"
                    onClick={handleClickOpen}
                >
                    <DriveFileRenameOutlineRoundedIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nueva Convocaroria</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={e => enviarInformacion(e)} onClose={handleClose} >
                       
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
                      
                        {/*RIVAL */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="rivalid">RIVAL</InputLabel>
                            <Select
                                labelId="rivalid"
                                id="rival"
                                // helperText={error.message}
                                // error={error.error}
                                value={formulario.rival}
                                onChange={(e) => setFormulario({ ...formulario, rival: e.target.value })}
                                label="Rival"
                                required
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value={0}>Uruguay</MenuItem>
                                <MenuItem value={1}>Brasil</MenuItem>
                                <MenuItem value={2}>Chile</MenuItem>
                                <MenuItem value={3}>Paraguay</MenuItem>
                               



                            </Select>
                        </FormControl>
                        
                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" onClick={() => setOpen(false)}>ENVIAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleClose}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>
        </div>
    );
}
export default ModalAgregarJugadores