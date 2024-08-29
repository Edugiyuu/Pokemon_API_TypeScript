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

/* interface PokemonType {
  slot: number;
  type: PokemonResult;
}

interface PokemonDetails {
  types: PokemonType[];
} */
/* interface Sprites {
  other: OtherSprites;
}

interface OtherSprites {
  home:{
    front_default: string;
  }
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface Type {
  type: {
    name: string;
    url: string;
  };
}

interface OtherThings {
  name: string;
  sprites: Sprites;
  abilities: Ability[];
  types: Type[];

}
 */
const Pokemons = () => {
  const [pokemonName, setPokemonName] = useState<PokemonPages>();
/*   const [pokemonImg, setPokemonImg] = useState<OtherThings>(); */
 /*  const [pokemonType, setPokemonType] = useState<PokemonDetails>(); */
  const [pokemonTotal, setPokemonTotal] = useState(20);
 
  

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemonTotal}&offset=0.`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setPokemonName(parsedResponse);
      })
  }, [pokemonTotal]);
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        //setPokemonImg(parsedResponse);
      /*   setPokemonType(parsedResponse.types) */
      })
      .catch((error) => console.error("Error", error));
  }, []);

  function verMais() {
    setPokemonTotal(pokemonTotal + 10);
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
              'Escolha seu Pokémon',
              10000, 
              'Saiba mais sobre os Pokémon',
              4000,
              'Ou Pesquise por um Pokémon',
              2000,
            ]}
            wrapper="span"
            speed={30}
            style={{fontFamily: "Rubik",fontSize: '2em',fontWeight: 'bold', display: 'inline-block',margin:'20px'}}
            repeat={Infinity}
          />
            
            <div className="pesquisar">
              <input placeholder="Procurando um Pokemon?" type="text" value={procurarPokemon} onChange={(pokemonProcurado) => setProcurarPokemon(pokemonProcurado.target.value)}/>
              <button className="Procurar" onClick={pokemonPesquisado}>
                Procurar
              </button>
            </div>
            
        </div>
        
      </header>
      <div >
      {pokemonName && (
            <div className="Pokemon-buttons">
              
              {pokemonName.results.map((pokemon) => (
                  <NavLink key={pokemon.name} className={"Pokemon-Link"} to={`/pokemon/${pokemon.name}`}>{pokemon.name}</NavLink>
              ))}
{/*               {pokemonType?.types.map((pokemon) => (
              <p>{pokemon.type.name}</p>
            ))} */}
            </div>
          )}
          
          
      <br></br>
      <button onClick={verMais}>Ver mais</button>
    </div>
    </div>
  );
};

export default Pokemons;