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
    FormControl, MenuItem, InputLabel, Select, NativeSelect, Checkbox, FormControlLabel, FormGroup

} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded';
import { cyan } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useParams } from 'react-router-dom';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import Swal from 'sweetalert2'

export function Convocar() {

   
    const { parametro } = useParams();

    const baseURL = 'http://localhost:3005';

    const [futbolistas, setFutbolistas] = useState([]);

    const [convocados, setConvocados] = useState([]);

    const navigate = useNavigate();

    // buscamos los jugadores activos
    useEffect(() => {
        buscarTodosFubolistas();
    }, []);

    const buscarTodosFubolistas = async () => {
        axios.get(baseURL + '/api/v1/futbolista/futbolistas')
            .then(res => {
                // console.log(res.data.dato); 
                setFutbolistas(res.data.dato);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // TAREA controlar que no se convoquen mas de 26 futbolistas
    const convocar = (idFutbolista) => {
        if (convocados.includes(idFutbolista)) {
            // Si ya está seleccionado, quito de la lista de convocados
            setConvocados(convocados.filter((rowId) => rowId !== idFutbolista));
        } else {
            // Si no está seleccionada, agrego a la lista de convocados
            if(convocados.length === 26 && (convocados.filter((idFutbolista.posicion)).length === 1)){
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    text: 'Superó el cupo permitido',
                    showConfirmButton: false,
                    timer: 1500
                  }) 
                // alert('Supero el cupo permitido')
            } 
            else{
                
                setConvocados([...convocados, idFutbolista]);
            }
            
            
        }
    }
   

    const enviarInformacion = () => {

        const lista = { idConvocatoria: parametro, futbolistas: convocados }
        // console.log(lista);   
        axios.post(baseURL + '/api/v1/futbolistaconvocatoria/nuevafutbolistaconvocatoria', lista)
            .then(async res => {
                // console.log(res.data); 
                if (res.data.estado === 'OK') {
                    const result = await Swal.fire({
                        text: res.data.msj,
                        icon: 'success',
                        confirmButtonText: 'Listo',
                        confirmButtonColor:'#326fd1'
                    })

                    if (result.isConfirmed) {
                        navigate('/convocatoria');
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });

    }
    return (
        <>

            <Container >


                <section className='contjugadores'>
                    <div className="jugadores">CONVOCAR</div>
                </section>


                <Box component="div">
                    <Card >
                        <CardContent >

                            <Grid container >
                                <Grid xs={4} item mt={2} mb={2}  >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddBoxRoundedIcon />}
                                        onClick={enviarInformacion}
                                    >Convocar</Button>
                                </Grid>
                                {/* <Grid xs={8} item marginBottom={2}>
                                    <TextField id="filled-basic" label="Filled" variant="filled" fullWidth />
                                </Grid> */}


                            </Grid>

                            <TableContainer sx={{ boxShadow: 1 }} >
                                <Table >
                                    <TableHead sx={{ bgcolor: "#052035" }}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography color="white" variant="h5" >JUGADOR</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">POSICIÓN</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">APODO</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">PIÉ HABIL</Typography></TableCell>
                                            <TableCell component="td"><Typography color="white" variant="h5">CONVOCAR</Typography></TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            futbolistas ? (futbolistas.map((item, index) => (
                                                <TableRow component="tr" key={index}>

                                                    <TableCell component="td" ailing="right">

                                                        <Grid container  ailing="center">
                                                            <Grid item lg={4} mt={2} >
                                                                <Avatar
                                                                    sx={[{ width: 56, height: 56 },
                                                                    { bgcolor: cyan[700] }]}
                                                                    alt={item.nombre}
                                                                    rc={item.foto} />
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
                                                    <TableCell component="td"><Typography variant="subtitle1">{item.piehabil}</Typography></TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item lg={6}>
                                                                <Checkbox 
                                                                    color="success"
                                                                    checked={convocados.includes(item.idFutbolista)}
                                                                    onChange={() => convocar(item.idFutbolista)} 
                                                                     />
                                                                        

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