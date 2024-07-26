import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/UserProfile.css';
import Img from '../Imgs/fire.png';

interface User {
  name: string;
  email: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Erro desconhecido');
        }
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  if (error) return <p>Erro: {error}</p>;

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
                <p>21</p>
                <p>Posts</p>
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
       
      </div>
    </div>
  );
};

export default UserProfile;
