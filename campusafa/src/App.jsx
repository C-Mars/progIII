
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Contacto } from './components/Contacto/Contacto';
import { Inicio } from './components/Inicio/Inicio';
import { Institucional } from './components/Institucional/Institucional';
import { Noticias} from './components/Noticias/Noticias'
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="institucional" element={<Institucional />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="noticias" element={<Noticias/>}/>
      </Routes>
      <Footer/>

    </BrowserRouter>
    </>
    
  );
}

export default App;
