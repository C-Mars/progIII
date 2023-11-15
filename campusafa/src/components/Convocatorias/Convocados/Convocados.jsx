import { useState, useEffect,useContext } from "react";
import { cyan , grey} from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { UserContext } from '../../UserContext/UserContext';
// import './Convocados.css';
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
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    NativeSelect,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Tooltip,
    IconButton,


} from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';

export function Convocados(props) {
    const { idConvocatoria, rival } = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const baseURL = 'http://localhost:3005';
    const Swal = require('sweetalert2')
    const [convocados, setConvocados] = useState([]);
    const [titulares, setTitulares] = useState([]);
    const [archivo, setArchivo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        buscarConvocados();
    }, []);
    const changeArchivo = (e) => {        
        setArchivo(e.target.files[0]);}
        
    const buscarConvocados = async () => {
        axios.get(baseURL + '/api/v1/futbolistaconvocatoria/futbolistaconvocatoria/' + idConvocatoria,{ headers:{
            Authorization:`Bearer ${userData.token}`
        }})
            .then(res => {
                // tarea agregar control       
                setConvocados(res.data.dato);
            })
            .catch(error => {
                console.log(error);
            });
    }



    //hacer
    const titularizar = async (idFutbolista) => {
        if (titulares.includes(idFutbolista)) {
            // Si ya está seleccionada, quitarla de la lista de seleccionadas
            setTitulares(titulares.filter((rowId) => rowId !== idFutbolista));
        } else {
            if (titulares.length === 11) {
                alert('lalal')
            } else {
                setTitulares([...titulares, idFutbolista])
            }
        }
    }

    // hacer
    const volver = () => {
        navigate('/privado/convocatoria')
    }
    function formatoFecha(dateTime) {
        const fecha = new Date(dateTime);
        return fecha.toISOString().split('T')[0];
    };
    return (
        <>

            <section className='contjugadores'>
                <div className="jugadores">EQUIPO TITULAR</div>
            </section>
            {/* *************TABLA CONVOCADOS--->EQUIPOTITULAR********** */}

            <Container >
                <Box component="div">
                    <Card >

                        <CardContent >
                            <Typography color="primary" variant="h5">Convocados vs {formatoFecha(rival)} </Typography>
                            <Grid container>
                                <Grid xs={4} item mt={2} mb={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<ReplyRoundedIcon />}
                                        onClick={volver}
                                    >Volver</Button>
                                </Grid>



                            </Grid>

                            <TableContainer sx={{ boxShadow: 1 }} >
                                <Table >

                                    <TableHead sx={{ bgcolor: "#052035" }}>
                                        <TableRow component="tr" >
                                            <TableCell component="td" ><Typography sx={{color : cyan[50]}} variant="h5" >JUGADOR</Typography></TableCell>

                                            <TableCell component="td"><Typography sx={{color : cyan[50]}} variant="h5">PIÉ HABIL</Typography></TableCell>

                                            <TableCell component="td"><Typography sx={{color : cyan[50]}} variant="h5">DORSAL</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{color : cyan[50]}} variant="h5">CAPITÁN</Typography></TableCell>
                                            <TableCell component="td"><Typography sx={{color : cyan[50]}} variant="h5">TITULAR({titulares.length})</Typography></TableCell>


                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ bgcolor:grey[100] }}>
                                        {
                                            convocados ? (convocados.map((item, index) => (
                                                <TableRow component="tr" key={index}>

                                                    <TableCell component="td" ailing="center">
                                                        <Grid container >
                                                            <Grid item lg={4} mt={2} >
                                                                <Avatar
                                                                    sx={[{ width: 56, height: 56 },
                                                                    { bgcolor: cyan[700] }]}
                                                                    alt={item.nombre}
                                                                    src={`http://localhost:3005/archivos/${item.foto}`} />
                                                            </Grid>
                                                            <Grid item lg={8} mt={2}>
                                                                <Typography variant="subtitle1">{item.nombre}</Typography>
                                                                <Typography variant="subtitle2"> {item.apellido}</Typography>

                                                            </Grid>

                                                        </Grid>
                                                    </TableCell>


                                                    <TableCell component="td"><Typography variant="subtitle1">{item.pieHabil}</Typography></TableCell>
                                                    <TableCell component="td"><Typography variant="subtitle1">{item.dorsal}</Typography></TableCell>


                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item>
                                                                <Tooltip disableFocusListener title="capitan">

                                                                    <Checkbox
                                                                        // checked={titulares.includes(item.idFutbolista)}
                                                                        // onChange={() => marcarCapitan(item.idFutbolista)}
                                                                        fontSize="large"
                                                                        color="error" />

                                                                </Tooltip>
                                                            </Grid>

                                                        </Grid>



                                                    </TableCell>
                                                    <TableCell component="td">
                                                        <Grid container>
                                                            <Grid item >
                                                                <Tooltip disableFocusListener title="titular">

                                                                    <Checkbox
                                                                        checked={titulares.includes(item.idFutbolista)}
                                                                        onChange={() => titularizar(item.idFutbolista)}
                                                                        fontSize="large"
                                                                        color="success" />

                                                                </Tooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            )))
                                                :
                                                (
                                                    <>
                                                    </>
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
    );
}