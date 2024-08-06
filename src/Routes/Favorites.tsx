import axios from 'axios';
import { useEffect, useState } from 'react'
import '../Styles/Favorites.css'
import { Link } from 'react-router-dom';
interface Favorites {
  name: string,
  img: string,
  types: string[]
}
const Favorites = () => {
  const [userFavorites, setUserFavorites] = useState<Favorites[]>([]);
  const pokemonTypes = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting'];
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          throw new Error('Token ou ID do usuário não encontrado');
        }

        var favorites = await axios.get(`http://localhost:3000/user/${userId}/favorites`);
        const arrayVazio = []
        for (let i = 0; i < favorites.data.favorites.length; i++) {
         arrayVazio.push(favorites.data.favorites[i].name) 
          
        }
        setUserFavorites(favorites.data.favorites)

      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Favoritos:</h2>
      <select >
        <option value="">Todos os Tipos</option>
        {pokemonTypes.map((type, index) => (
          <option key={index}>{type}</option>
        ))}
      </select>
      <div className='allFavorites'>
      
      {userFavorites.map((pokemon, index) => (
          <div className='favorited' style={{
            backgroundColor: `var(--background-${pokemon.types[0]})`,
            background: `var(--background-${pokemon.types[0]}) var(--img-${pokemon.types[0]}) center center`,
            backgroundSize: '225px',
            backgroundRepeat: 'no-repeat',
            borderRadius: '10px',
          }} key={index}>
            <h4 className='name'>{pokemon.name}</h4>
            
              <img className='favPokemons'  src={pokemon.img}/>
              <div className='fav-types'>
                {pokemon.types.map((type, i) => (
                  <img
                    key={i}
                    style={{ width: '70px' }}
                    src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${type}.svg`}
                    alt={type}
                  />
                ))}
              </div>
              <Link className='LinkInfo' to={`/pokemon/${pokemon.name}`}>Mais Infos</Link>
            
          </div>
        ))}
    </div>
    </div>
    
  )
}

export default Favorites