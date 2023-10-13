
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Contacto } from './components/Contacto/Contacto';
import { Inicio } from './components/Inicio/Inicio';
import { Institucional } from './components/Institucional/Institucional';
import { Noticias } from './components/Noticias/Noticias'
import { Footer } from './components/Footer/Footer';
import { InicioSesion } from './components/InicioSesion/iniciosesion';
import { Jugador } from './components/Jugador/Jugador';
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <>
      <NextUIProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="institucional" element={<Institucional />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="noticias" element={<Noticias />} />
            <Route path="jugador" element={<Jugador />} />
            {/* <Route path="convocatoria" element={}/>
        <Route path="equipotitular" element={}/> */}
            <Route path="iniciosesion" element={<InicioSesion />} />


          </Routes>
          <Footer />

        </BrowserRouter>
      </NextUIProvider>

    </>

  );
}

export default App;
