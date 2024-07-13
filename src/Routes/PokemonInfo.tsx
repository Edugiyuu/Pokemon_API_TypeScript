import { useState, useEffect } from "react";
import { Link, NavLink, useParams } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'; 'recharts';
import image from '../Imgs/CardFrames/image.png'
import '../Styles/PokemonInfo.css';

interface Stats {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Sprites {
  other: OtherSprites;
  versions: Versions;
}

interface OtherSprites {
  showdown: {
    back_default: string;
    front_default: string;
  };
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

interface GenerationVIII {
  icons: {
    front_default: string;
  };
}

interface Versions {
  "generation-viii": GenerationVIII;
}

interface OtherThings {
  name: string;
  sprites: Sprites;
  abilities: Ability[];
  types: Type[];
  stats: Stats[];
}

//---------------------------------

interface PokemonSpecies {
  color: {
    name: string,
    url: string
  }
  habitat: {
    name: string | null,
    url: string
  }
  evolves_from_species: {
    name: string,
    url: string
  }
}



function PokemonInfo() {

  const [pokemonInfo, setPokemonInfo] = useState<Stats[] & OtherThings & Sprites>();
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>();
  
  const [sprite, setSprite] = useState('front_default');
  const params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        setPokemonInfo(parsedResponse);

      })
      .catch((error) => console.error("Error", error));
  }, []);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.name}`)
      .then((response) => response.json())
      .then((parsedResponse) => {

        setPokemonSpecies(parsedResponse)

      })
      .catch((error) => console.error("Error", error));
  }, []);
  function mudarSpriteNormal() {
    if (sprite === 'front_default') {
      setSprite('back_default');
    } else {
      setSprite('front_default');
    }
    if (sprite === 'back_shiny') {
      setSprite('back_default')
    }
  }
  function mudarSpriteShiny() {
    if (sprite === 'front_default') {
      setSprite('back_shiny');
    } else if (sprite === 'back_shiny') {
      setSprite('front_shiny');
    } else if (sprite === 'front_shiny') {
      setSprite('back_shiny');
    }
  }
  console.log(pokemonInfo?.stats);
  const data2 = pokemonInfo?.stats.map((stat) => ({
    name: stat.stat.name,
    base_stat: stat.base_stat,
    
  }));

  return (
    <>
      {pokemonInfo && (
        <div>
          <div style={{
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom:'10px',
            marginTop:'10px',
          /*   backgroundColor: `${pokemonSpecies?.color.name}`, */
            display: 'flex',
            borderRadius: '9px',
            border:'2px solid rgb(0, 0, 0)',
            justifyContent: 'start', alignItems: 'start',
         
          }}>
            
            <h1 style={{
              marginRight: '30px',
              marginLeft: '50px',
            
              letterSpacing: '4px', 
            }}>
              {pokemonInfo?.name}
            </h1>
            <img style={{ 
      transform: 'scale(1.6)', 

    }} src={pokemonInfo.sprites.versions["generation-viii"].icons.front_default} alt="" />
          </div>

          <div className="Infos">
            {pokemonInfo.sprites && pokemonSpecies?.color && (
              <div className="img">
                <img className='pokemon-img'src={pokemonInfo.sprites.other.home.front_default} alt="" />

                <button onClick={mudarSpriteNormal}>Mudar Sprite</button>
                <button onClick={mudarSpriteShiny}>Versão Shiny</button>
              </div>
            )}
            {pokemonInfo.abilities && (
              <div className="ability">
                <h2>Abilities:</h2>
                {pokemonInfo.abilities.map((pokemon) => (
                  <NavLink className={'NavLink2'} to={`/pokemon/ability/${pokemon.ability.name}`}>{pokemon.ability.name}</NavLink>
                ))}
              </div>
            )}
            {pokemonInfo.types && (
              <div className="Types">
                <h2>Types:</h2>
                {pokemonInfo.types.map((pokemon) => (
                  <NavLink to={`/pokemon/type/${pokemon.type.name}`} className={`btn btn-header ${pokemon.type.name}`} id={pokemon.type.name} style={{ borderRadius: '9px', margin: '4px', padding: '20px' }}>{pokemon.type.name}</NavLink>
                ))}
              </div>
            )}
            {pokemonSpecies?.color && (
              <div className="habitat">
                <h2>Habitat:</h2>
                {/* se for diferente de null ele mostra normal mas se for null ele mostra indisponivel */}
                {pokemonSpecies.habitat !== null ? (
                  <div>{pokemonSpecies.habitat.name}</div>
                ) : (
                  <div>Habitat não disponível</div>
                )}

              </div>
            )}
            {pokemonSpecies?.evolves_from_species && (
              <div className="Evolução">
                <h2 >Evolução anterior</h2>
                <Link className={'NavLink2'} to={`/pokemon/${pokemonSpecies.evolves_from_species.name}`} >{pokemonSpecies.evolves_from_species.name}</Link>
              </div>
            )}

          </div>

          {pokemonInfo && (

            <div className="stats">

              <h2>Stats base:</h2>

              <RadarChart width={750} height={400} data={data2}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name={`${params.name} Stats`} dataKey="base_stat" stroke="#74e448" fill="#50f058" fillOpacity={0.6} />
                <Tooltip></Tooltip>
              </RadarChart>
            </div>
          )}
        </div>
      )}

    </>
  );
}

export default PokemonInfo;
