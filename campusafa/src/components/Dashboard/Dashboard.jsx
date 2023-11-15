import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import './Dashboard.css'
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import axios from 'axios';


import Col from 'react-bootstrap/Col';
import { Cuerpo } from '../Cuerpo/Cuerpo';
import { Grid, Typography, Button, Card, CardContent, Box, CardActionArea, CardMedia } from '@mui/material';


const Dashboard = () => {
    const baseURL = 'http://localhost:3005';

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);

    const [estadistica, setEstadistica] = useState(null);


    useEffect(() => {
        // busco la info estadistica unicamente cuando sea presidente
        if (userData.user.tipoUsuario === 0) {
            buscarEstadistica();
        }
    }, []);


    const buscarEstadistica = async () => {
        axios.get(baseURL + '/api/v1/estadistica/estadistica', {
            headers: {
                Authorization: `Bearer ${userData.token}` //necesario para la autenticacion del usuario en el api
            }
        })
            .then(resp => {
                setEstadistica(resp.data.dato);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const irAConvocatoria = () => {
        navigate(`/privado/convocatoria`);
    };

    const irAFutbolista = () => {
        navigate(`/privado/futbolista`);
    };

    return (userData.user ?
        <>
            <main>
                <Cuerpo>
                    <Box sx={{ m: 2 }}>
                        <section className='centre'>
                            <div className="entrenador"><h1>BIENVENIDO  {userData.user.nombre}!</h1>
                            </div>
                        </section>
                    </Box>
                    <ProtectedElement mustBeEntrenador={true}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea onClick={irAFutbolista}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/jugadoras.jpg"
                                            alt="Jugadoras de fútbol femenino"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Jugadoras
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea onClick={irAConvocatoria}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/femenino1.jpg"
                                            alt="Jugadoras de fútbol femenino disputando un partido"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Convocatorias
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino en las distintas convocatorias programadas
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>
                        {/* <Card sx={{ m: 2 }}>
                            <CardContent >
                                <Grid sx={{ m: 2 }} spacing={2}>
                                    <Typography>Convocatorias</Typography>
                                </Grid>
                                <Grid sx={{ m: 2 }}>
                                    <Button sx={{ m: 2 }} variant="contained" color="secondary" component="span" onClick={irAConvocatoria}>
                                        VER
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{ m: 2 }}>
                            <CardContent >
                                <Grid sx={{ m: 2 }} spacing={2}>
                                    <Typography sx={{ m: 2 }}>Jugadores</Typography>
                                </Grid>
                                <Grid>
                                    <Button sx={{ m: 2 }} variant="contained" color="secondary" component="span" onClick={irAFutbolista}>
                                        VER
                                    </Button>
                                </Grid>
                            </CardContent>
                        </Card> */}
                    </ProtectedElement>
                    <ProtectedElement mustBePresidente={true}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/seleccion-argentina-de-futbol-femenino_862x485.jpg"
                                            alt="Jugadoras de fútbol femenino"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            Activos
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/images.jpg"
                                            alt="Jugadoras de fútbol femenino disputando un partido"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            Lesionados
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino en las distintas convocatorias programadas
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea onClick={irAConvocatoria}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/femenino1.jpg"
                                            alt="Jugadoras de fútbol femenino disputando un partido"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Convocatorias
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino en las distintas convocatorias programadas
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} m={2}>
                                    <CardActionArea onClick={irAConvocatoria}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image="/femenino1.jpg"
                                            alt="Jugadoras de fútbol femenino disputando un partido"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Proximo partido
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Sección principal para la conformación del equipo femenino en las distintas convocatorias programadas
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        </Grid>

                    </ProtectedElement>

                </Cuerpo>
            </main >

        </> : <></>
    )
};

export { Dashboard };