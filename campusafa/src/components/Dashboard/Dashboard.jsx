import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext/UserContext';
import './Dashboard.css'
import { ProtectedElement } from '../ProtectedElement/ProtectedElement';
import axios from 'axios';


import Col from 'react-bootstrap/Col';
import { Cuerpo } from '../Cuerpo/Cuerpo';
import { Grid, Typography, Button, Card, CardContent, Box } from '@mui/material';


const Dashboard = () => {
    const baseURL = 'http://localhost:3010';

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
                        <div className="entrenador"><h1>Bienvenido {userData.user.nombre}!</h1>
                        </div>
                    </section>
                    </Box>
                   


                    <ProtectedElement mustBeEntrenador={true}>
                        <Card sx={{ m: 2 }}>
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
                        </Card>
                    </ProtectedElement>
                    <ProtectedElement mustBePresidente={true}>
                        <div className='row'>
                            <h3>Scaloneta</h3>
                            <div className='container mt-3 mb-1 mb-5'>
                                <div className="col-md-12">
                                    <div className='row'>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='success'>
                                                <Card.Body>
                                                    <Card.Title>Futbolistas Creados</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Activos</Card.Subtitle>
                                                    <Card.Text><h3>100</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='danger'>
                                                <Card.Body>
                                                    <Card.Title>Lesionados</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">No llegan...</Card.Subtitle>
                                                    <Card.Text><h3>10</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='info'>
                                                <Card.Body>
                                                    <Card.Title>Convocatorias</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Con 26 convocados</Card.Subtitle>
                                                    <Card.Text><h3>10</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='info'>
                                                <Card.Body>
                                                    <Card.Title>Próximo Partido</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Córdoba</Card.Subtitle>
                                                    <Card.Text><h3>14/11/2023</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <h3>Bedelia</h3>
                            <div className='container mt-3 mb-1 mb-5'>
                                <div className="col-md-12">
                                    <div className='row'>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='info'>
                                                <Card.Body>
                                                    <Card.Title>Estudiantes + 30</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Con mas de 30 años</Card.Subtitle>
                                                    <Card.Text><h3>{(estadistica ? estadistica.mas30 : <></>)}</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4} lg={3}>
                                            <Card bg='info'>
                                                <Card.Body>
                                                    <Card.Title>Inscriptos TUDW</Card.Title>
                                                    <Card.Subtitle className="mb-2 text-muted">Cant. Insc. TUDW</Card.Subtitle>
                                                    <Card.Text><h3>{(estadistica ? estadistica.cantidadInscriptos : <></>)}</h3></Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ProtectedElement>
               
            </Cuerpo>
        </main >
           
        </> : <></>
    )
};

export { Dashboard };