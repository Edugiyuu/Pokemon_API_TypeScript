import { useState } from 'react';

const useOpenClose = (inicio: boolean,) => {
  const [isOpen, setIsOpen] = useState(inicio);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, toggle];
};

export default useOpenClose;