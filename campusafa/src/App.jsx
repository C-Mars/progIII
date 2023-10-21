
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
import{Convocatorias} from './components/Convocatorias/Convocatorias';
import{Convocar} from './components/Convocatorias/Convocar/Convocar';
import{Convocados} from './components/Convocatorias/Convocados/Convocados';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="institucional" element={<Institucional />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="jugador" element={<Jugador />} />
          <Route path="convocatoria" element={<Convocatorias/>}/>
          
        <Route path='/convocar/:parametro' element={<Convocar/>}/>
        <Route path='/convocados/:idConvocatoria/:rival' element={<Convocados/>}/>
        {/* <Route path="equipotitular" element={}/> */}
          <Route path="iniciosesion" element={<InicioSesion />} />
        </Routes>
        <Footer />

      </BrowserRouter>

    </>

  );
}

export default App;
