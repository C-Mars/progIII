
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Contacto } from './components/Contacto/Contacto';
import { Inicio } from './components/Inicio/Inicio';
import { Institucional } from './components/Institucional/Institucional';
import { Noticias} from './components/Noticias/Noticias'

function App() {
  return (
    <BrowserRouter>
      <Body />

      <Header />
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="institucional" element={<Institucional />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="noticias" element={<Noticias/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
