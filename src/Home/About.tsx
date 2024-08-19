import AboutImg1 from '../Imgs/CardFrames/AboutImg1.png'
import GitHub from '../Imgs/Icons/GitHub.png'
import "../Styles/About.css"

const About = () => {
    return (
      <div className="about">
        <div className="text">
          <h1>Poke API</h1>
          <h2>Por EduGiyuu</h2>
          <p>Esse é uma segunda versão do meu projeto :) </p>
          <div className='myLinks'>
            <a href="https://github.com/Edugiyuu" target="_blank" rel="noopener noreferrer">
                <img className='gitHubIcon' src={GitHub} alt="" />
            </a>
            <a href="https://github.com/Edugiyuu" target="_blank" rel="noopener noreferrer">
                <img className='gitHubIcon' src={GitHub} alt="" />
            </a>
            <a href="https://github.com/Edugiyuu" target="_blank" rel="noopener noreferrer">
                <img className='gitHubIcon' src={GitHub} alt="" />
            </a>
          </div>
        </div>
        
        <div className="img-container">
          <img src={AboutImg1} alt="Descrição da imagem" />
        </div>
      </div>
    );
  }
  
  export default About;