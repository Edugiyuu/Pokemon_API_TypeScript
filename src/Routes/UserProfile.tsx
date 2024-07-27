import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserProfile.css';
import Img from '../Imgs/fire.png';

interface User {
  name: string;
  email: string;
}
interface Favorites{
  name:string,
  img:string
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

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        
      }
    };

    fetchUserData();
  }, []);

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
            
          </div>
        ) : (
          <p>Usuário não encontrado.</p>
        )}
      </div>
      <div className="edit-profile">
        <h2>Basic Info</h2>
        {userFavorites.map((pokemon, index) => (
          <div>
            <h3 key={index}>{pokemon.name}</h3>
            <img className='favPokemons' style={{width:"100px"}} src={pokemon.img} alt="" />
          </div>

            ))}
      </div>
    </div>
  );
};

export default UserProfile;
