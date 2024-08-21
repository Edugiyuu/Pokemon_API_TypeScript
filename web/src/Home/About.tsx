/* import AboutImg1 from '../Imgs/CardFrames/AboutImg1.png' */
import Gloria from '../Imgs/Caracters/Gloria.png'
import Mars from '../Imgs/Caracters/Mars.png'
import HalaEHau from '../Imgs/Caracters/Hala&Hau.png'
import Inicial from '../Imgs/CardFrames/Iniciais.png'
import GitHub from '../Imgs/Icons/GitHub.png'
import "../Styles/About.css"
import {NavLink } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <div className='sobreOProjeto'>
        <img width={"300px"} src={Inicial} alt="" />
        <h1>Poke API</h1>
        <h1>Sobre projeto</h1>

        <p>Esse Projeto foi feito para descobrir mais sobre os pokemon</p>
        <p>Além de muita outras coisas</p>
        <NavLink className='NavLink' to={'/'}>Ver Mais</NavLink>

      </div>

      <div className='sobreOUsuario'>
        <h1>Sobre o Usuario</h1>
        <p>Com sua Conta de Usuario você pode favoritar seus Pokemons Favoritos!</p>
      </div>

      <div className="about">

        <img className='mobileChar' src={HalaEHau} />

        <div className="img-container">
          <img className='Char' src={Mars} />
        </div>
        <div className="text">

          <h1>Por EduGiyuu</h1>
          <p>Esse é uma segunda versão do meu projeto :) </p>
          <div className='myLinks'>
            <a href="https://github.com/Edugiyuu" >
              <img className='gitHubIcon' src={GitHub} />
            </a>
            <a href="https://github.com/Edugiyuu">
              <img className='gitHubIcon' src={GitHub} />
            </a>
          </div>

        </div>

        <div className="img-container">
          <img className='Char' src={Gloria} />
        </div>
      </div>


    </div>
  );
}

export default About;