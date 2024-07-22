import { useState, createContext, useEffect, ReactNode } from "react";
import axios from "axios";

interface UseContextType {
  name: string;
  email: string;
}

export const UseContext = createContext<UseContextType | null>(null);

interface UseStorageProps {
  children: ReactNode;
}

export const UseStorage = ({ children }: UseStorageProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUseData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setName(response.data.name);
          setEmail(response.data.email);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUseData();
  }, []);

  return (
    <UseContext.Provider value={{ name, email}}>
      {children}
    </UseContext.Provider>
  );
};
