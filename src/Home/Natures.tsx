import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
  const [confirmNature, setConfirmNature] = useState(false);

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
    setConfirmNature(true);
  }

  function OpenClose() {
    setConfirmNature(true);
    if (confirmNature === true) {
      setConfirmNature(false)
    }

  }
  const [procurarPokemon, setProcurarPokemon] = useState('');
  const pokemonPesquisado= () => {
    window.location.href = `/pokemon/nature/${procurarPokemon.toLowerCase()}`;
  };
  return (
    
    <div>
      
        <header className="App-header">
        
        <div className="Titulo">
          
             <h1>Procurando uma nature?</h1>
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
              <button onClick={() => OpenClose()} >Não</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default NaturePage;