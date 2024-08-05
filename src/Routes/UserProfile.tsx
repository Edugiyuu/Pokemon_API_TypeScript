import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserProfile.css';
import Img from '../Imgs/fire.png';
import { NavLink } from 'react-router-dom';
import magikarp from '../Imgs/magikarp.png'
interface User {
  name: string;
  email: string;
}
interface Favorites {
  name: string,
  img: string,
  types: string[]
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userFavorites, setUserFavorites] = useState<Favorites[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
          throw new Error('Token ou ID do usuário não encontrado');
        }

        const response = await axios.get(`http://localhost:3000/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        var favorites = await axios.get(`http://localhost:3000/user/${userId}/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserFavorites(favorites.data.favorites)
        /*  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${userFavorites}`); */

        setUser(response.data.user);
      } catch (error) {
        console.log(error);

      }
    };

    fetchUserData();
  }, []);
  const tresPrimeirosPokemons = userFavorites.slice(0, 3);
  console.log(tresPrimeirosPokemons);


  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <h1>Perfil</h1>
        {user ? (
          <div className="profile-info">
            <img src={Img} alt="Profile" className="profile-image" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="stats">
              <div className="stat">

                <p>Algo</p>
              </div>

            </div>
            <button>Upload new avatar</button>
            <img src={magikarp} alt="" />
          </div>
        ) : (
          <p>Usuário não encontrado.</p>
        )}
      </div>
      <div className="profile-edit-profile">
        <h2>Favorites</h2>
        {tresPrimeirosPokemons.map((pokemon, index) => (
          <div className='profile-favorited' key={index}>
            <h4 className='profile-name'>{pokemon.name}</h4>
            <div className='profile-fav-content'>
              <img className='profile-favPokemons' src={pokemon.img} alt={pokemon.name} />
              <div className='profile-fav-types'>
                {pokemon.types.map((type, i) => (
                  <img
                    key={i}
                    style={{ width: '80px' }}
                    src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${type}.svg`}
                    alt={type}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
        <NavLink className='NavLink' to='/pokemon/favorites'>Ver Mais</NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
