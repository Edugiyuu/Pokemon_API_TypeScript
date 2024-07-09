import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';

// video: https://www.youtube.com/watch?v=0ZJgIjIuY7U&ab_channel=WebDevSimplified
interface PokemonResult {
    name: string;
    url: string;
}
  
interface PokemonPages {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}

//------------------------------------------
interface Sprites {
    other: OtherSprites | null;
}


interface OtherSprites{
    "official-artwork": OfficialArtworkSprites ;
}

interface OfficialArtworkSprites {
    front_default: string;
    front_shiny: string;
  }

const Pokemons = () => {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonPages>();
  const [pokemonImg, setPokemonImg] = useState<Sprites>();
  const [pokemonNome, setPokemonNome] = useState("");
  const [pokemonTotal, setPokemonTotal] = useState(20);
  const [confirmPokemon, setConfirmPokemon] = useState(false);


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonTotal}&offset=0.`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setPokemonInfo(parsedResponse);
      })
  }, [pokemonTotal]);
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setPokemonImg(parsedResponse.sprites);
      })
      .catch((error) => console.error("Error", error));
  }, [pokemonNome]);

  function handleClick(pokemonName: string) {
    setPokemonNome(pokemonName);
    setConfirmPokemon(true);
  }

  function verMais() {
    setPokemonTotal(pokemonTotal + 10);
  }
  function OpenClose() {
    setConfirmPokemon(true);
    if (confirmPokemon === true) {
      setConfirmPokemon(false)
    }
  }
  
  const [procurarPokemon, setProcurarPokemon] = useState('');
  const pokemonPesquisado= () => {
    window.location.href = `/pokemon/${procurarPokemon.toLowerCase()}`;
  };


  return (
    <div className="App">
        <header className="App-header">
        
        <div className="Titulo">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Escolha seu Pokémon',
              10000, 
              'Saiba mais sobre os Pokémon',
              4000,
              'Ou Pesquise por um Pokémon',
              2000,
             
            ]}
            wrapper="span"
            speed={30}
            style={{fontFamily: "Raleway",fontSize: '2em',fontWeight: 'bold', display: 'inline-block',margin:'20px'}}
            repeat={Infinity}
          />
            
            <div className="pesquisar">
              <input placeholder="Procurando um Pokemon?" type="text"value={procurarPokemon} onChange={(pokemonProcurado) => setProcurarPokemon(pokemonProcurado.target.value)}/>
              <button className="Procurar" onClick={pokemonPesquisado}>
                Procurar
              </button>
            </div>
            
        </div>
        
      </header>
      <div >
      {pokemonInfo && (
            <div className="Pokemon-buttons">
              
              {pokemonInfo.results.map((pokemon) => (
                <button key={pokemon.name} onClick={() => handleClick(pokemon.name)}>{pokemon.name}</button>
              ))}
            </div>
          )}
          
      <br></br>
      <button onClick={verMais}>Ver mais</button>
      <NavLink to={`/pokemon/${pokemonNome}`}>{pokemonNome}</NavLink>
      
    
    </div>
    {confirmPokemon && (
          <div className='container'>
            
            <div className='confirm-container'>
             <h2>Quer ver mais sobre {pokemonNome}?</h2>
             {pokemonImg && (
              <img src={pokemonImg.other?.["official-artwork"].front_default} alt="" />
             )}
              
              <NavLink className={"NavLink"} to={`/pokemon/${pokemonNome}`}>Sim</NavLink>
              <button className="DeclineButton" onClick={OpenClose} >Não</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Pokemons;