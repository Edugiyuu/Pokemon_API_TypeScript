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
      
    };

    fetchUseData();
  }, []);

  return (
    <UseContext.Provider value={{ name, email}}>
      {children}
    </UseContext.Provider>
  );
};
