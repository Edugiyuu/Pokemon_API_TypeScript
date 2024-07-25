import React, { useEffect, useState } from 'react';
import axios from 'axios';


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
        // Verifique se o erro é uma instância de Error
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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {user ? (
        <div>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Adicione mais campos se necessário */}
        </div>
      ) : (
        <p>Usuário não encontrado.</p>
      )}
    </div>
  );
};

export default UserProfile;
