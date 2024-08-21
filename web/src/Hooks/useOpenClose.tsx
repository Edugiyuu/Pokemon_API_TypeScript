import { useState } from 'react';

function useOpenClose(initialState: boolean): [boolean, () => void] {
  const [isOpen, setIsOpen] = useState(initialState);

  function changeBoolean() {
    setIsOpen(!isOpen);
  }

  return [isOpen, changeBoolean];
}

export default useOpenClose;
