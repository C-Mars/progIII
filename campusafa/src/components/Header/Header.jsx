 
import './Header.css'
export function Header() {
    return (
        <>
            <div class="logoNav">
                {/* <a href="../index.html"><img src="../img/Logo_AFA-02.png" alt="Logo de la AFA">
                </a> */}
            </div>
            <nav>
                <ul class="menu">
                    <li><a href="#">INSTITUCIONAL</a>
                        {/* <ul class="submenu">
                            <li><a href="./historia.html"><p>Historia</p></a></li>
                            <li><a href="./autoridades.html"><p>Autoridades</p></a></li>
                            <li><a href="https://www.afa.com.ar/upload/demo/6230%20_%20Reglamento%20F%C3%BAtbol%20Femenino%20Primera%20A%202023.pdf" target="_blank"><p>Reglamento</p></a></li>
                        </ul> */}
                    </li>
                    {/* <li><a href="./jugadores.html">JUGADORES</a></li>
                    <li><a href="./convocatorias.html">CONVOCATORIAS</a></li>
                    <li><a href="./equipotitular.html">EQUIPO TITULAR</a></li> */}
                    <li><a href="./contacto.html">CONTACTO</a></li>
                </ul>
            </nav>
            {/* <div class="log">
                <a href="./iniciosesion.html">Iniciar sesión</a>
            </div> */}
        </>
    );
}