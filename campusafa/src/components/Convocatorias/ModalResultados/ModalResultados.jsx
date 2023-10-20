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
    FormControl, MenuItem, InputLabel, Select, NativeSelect

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { cyan } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
export function ModalResultados() {
    // Inicio del modal
    const [openconv, setOpenConv] = React.useState(false);
    //AGREGAR JUGADORES
    const handleClickOpenConvocatoria = () => {
        // buscarRivales()
        setOpenConv(true);
    };

    const handleCloseConvocatoria = () => {
        setOpenConv(false);
    };


    return (
        <>
            <Tooltip disableFocusListener title="Resultados">
                <IconButton aria-label="resultados" onClick={handleClickOpenConvocatoria}
                // onClick={() => convocados(item.idConvocatoria, item.fecha)}
                >
                    <ArticleRoundedIcon fontSize="large" sx={{ color: cyan[700] }} />
                </IconButton>
            </Tooltip>

            <Dialog className="editar" open={openconv}
                onClose={handleCloseConvocatoria}>
                <DialogTitle >Resultados</DialogTitle>
                <DialogContent>
                    <Box component="form"
                        // onSubmit={e => crearConvocatoria(e)} 
                        onClose={handleCloseConvocatoria} >

                        {/* Goles Recibidos */}
                        <TextField
                            id="golesrecibidos"
                            label="Goles Recibidos"
                            type='number'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            required
                            fullWidth
                        // value={convocatoria.golesrecibidos}
                        // onChange={(e) => setConvocatorias({ ...convocatoria, golesrecibidos: e.target.value })}
                        />
                        {/* Goles Realizados */}
                        <TextField
                            id="golesrealizados"
                            label="Goles Realizados"
                            type='number'
                            variant="standard"
                            margin="normal"
                            // helperText={error.message}
                            // error={error.error}
                            required
                            fullWidth
                        // value={convocatoria.golesrealizados}
                        // onChange={(e) => setConvocatorias({ ...convocatoria, golesrealizados: e.target.value })}
                        />

                        <Box mt={2}  >

                            <Button sx={{ m: 2 }} variant="contained" color="secondary" type="submit" >GUARDAR</Button >
                            <Button sx={{ m: 2 }} variant="contained" onClick={handleCloseConvocatoria}>CANCELAR</Button>
                        </Box>

                    </Box>
                </DialogContent>

            </Dialog>
        </>
    )
}