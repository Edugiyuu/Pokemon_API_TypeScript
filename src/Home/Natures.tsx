import { useEffect, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import useOpenClose from "../Hooks/useOpenClose";

// video: https://www.youtube.com/watch?v=0ZJgIjIuY7U&ab_channel=WebDevSimplified
interface NatureNameURL {
    name: string,
    url: string
}

interface AllNatures {
    results: NatureNameURL[]
}
interface InfoNatures{
  decreased_stat: NatureNameURL
  increased_stat: NatureNameURL

}
const NaturePage = () => {
  const [pokemonNatures, setPokemonNatures] = useState<AllNatures>();
  const [pokemonNature, setPokemonNature] = useState("");
  const [infoNature, setInfoNature] = useState<InfoNatures>();
  const [confirmNature, changeBoolean] = useOpenClose(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/nature/?limit=25`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
       
        setPokemonNatures(parsedResponse);
      })
  }, []);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/nature/${pokemonNature}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setInfoNature(parsedResponse)
      });
  }, [pokemonNature]);

  function handleClick(pokemonNature:string) {

    setPokemonNature(pokemonNature);
    changeBoolean();
  }
 
  return (
    
    <div>
      
        <header className="App-header">
        
        <div className="Titulo">
          
          <TypeAnimation
            sequence={[
              'Procurando uma nature?',
              10000,
              'Que tal a nature modest?',
              2000,
              'Brave talvez?',
              2000,

            ]}
            wrapper="span"
            speed={35}
            style={{ fontFamily: "Raleway", fontSize: '2em', fontWeight: 'bold', display: 'inline-block', margin: '20px' }}
            repeat={Infinity}
          />
            
        </div>
        
      </header>
      <div >
      {pokemonNatures && (
            <div className="Pokemon-buttons">
              
              {pokemonNatures.results.map((pokemon,index) => (
                <button key={index} onClick={() => handleClick(pokemon.name)}>{pokemon.name}</button>
              ))} 
            </div>
          )}
      <br></br>
    
    </div>
    {confirmNature && (
          <div className='container'>
            
            <div className='confirm-container'>
             <h2>{pokemonNature.toLocaleUpperCase()}</h2>

             <div className="natures">
             {infoNature && infoNature.increased_stat && <h2 className="up">Aumenta: {infoNature.increased_stat.name}</h2>}
             {infoNature && infoNature.decreased_stat && <h2 className="down">Diminui: {infoNature.decreased_stat.name}</h2>}

             {infoNature && !infoNature.increased_stat && <h2>Sem mudançãs de stats</h2>}
             </div>
             

              <button className="DeclineButton" onClick={changeBoolean}>Fechar</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default NaturePage;