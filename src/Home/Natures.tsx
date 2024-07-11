import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
const NaturePage = () => {
  const [pokemonNatures, setPokemonNatures] = useState<AllNatures>();
  const [pokemonNature, setPokemonNature] = useState("");
  const [confirmNature, changeBoolean] = useOpenClose(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/nature/?limit=25`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
       
        setPokemonNatures(parsedResponse);
      })
  }, []);

  function handleClick(pokemonNature:string) {
    setPokemonNature(pokemonNature);
    changeBoolean();
  }

  const [procurarPokemon, setProcurarPokemon] = useState('');
  const pokemonPesquisado= () => {
    window.location.href = `/pokemon/nature/${procurarPokemon.toLowerCase()}`;
  };
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

            <div className="pesquisar">
              <input placeholder="Escreva a nature em ingles :)" type="text"value={procurarPokemon} onChange={(pokemonProcurado) => setProcurarPokemon(pokemonProcurado.target.value)}/>
              <button  onClick={pokemonPesquisado}>
                Procurar
              </button>
            </div>
            
        </div>
        
      </header>
      <div >
      {pokemonNatures && (
            <div className="Pokemon-buttons">
              
              {pokemonNatures.results.map((pokemon) => (
                <button onClick={() => handleClick(pokemon.name)}>{pokemon.name}</button>
              ))} 
            </div>
          )}
      <br></br>
    
    </div>
    {confirmNature && (
          <div className='container'>
            
            <div className='confirm-container'>
             <h2>Quer ver mais sobre {pokemonNature}?</h2>
              <NavLink className={'NavLink'} to={`/pokemon/nature/${pokemonNature}`}>Sim</NavLink>
              <button className="DeclineButton" onClick={changeBoolean} >Não</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default NaturePage;