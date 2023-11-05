
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Contacto } from './components/Contacto/Contacto';
import { Inicio } from './components/Inicio/Inicio';
import { Institucional } from './components/Institucional/Institucional';
import { Noticias } from './components/Noticias/Noticias';
import { Footer } from './components/Footer/Footer';
import { InicioSesion } from './components/InicioSesion/InicioSesion';
import { Jugador } from './components/Jugador/Jugador';
import { Convocatorias } from './components/Convocatorias/Convocatorias';
import { Convocar } from './components/Convocatorias/Convocar/Convocar';
import { Convocados } from './components/Convocatorias/Convocados/Convocados';
import { Dashboard } from './components/Dashboard/Dashboard';
import { UserProvider } from './components/UserContext/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='institucional' element={<Institucional />} />
            <Route path='contacto' element={<Contacto />} />
            <Route path='iniciosesion' element={<InicioSesion />} />
            <Route path='/privado/dashboard'
              element={
                // ruta protegida para usuarios logueados, presidente o entrendor
                <ProtectedRoute mustBeEntrenador={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              } />

            <Route path='/privado/futbolista'
              element={
                <ProtectedRoute mustBeEntrenador={true}>
                  {<Jugador />}
                </ProtectedRoute>
              } />

            <Route path='/privado/convocatoria'
              element={
                <ProtectedRoute mustBeEntrenador={true}>
                  {<Convocatorias />}
                </ProtectedRoute>
              } />

            <Route path='privado/convocar/:parametro'
              element={
                <ProtectedRoute mustBeEntrenador={true}>
                  {<Convocar />}
                </ProtectedRoute>
              }
            />
            <Route path='privado/convocados/:idConvocatoria/:rival' element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<Convocados />}
              </ProtectedRoute>
            } />
          </Routes>
          </UserProvider>
          <Footer />
      </BrowserRouter>

    </>

  );
}

export default App;
