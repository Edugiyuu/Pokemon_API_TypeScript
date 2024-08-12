import { useState, useEffect, memo } from "react";
import UserSideBar from './UserSideBar';
import '../Styles/MenuUp.css';
import SideBarHome from './SideBarHome';
import Logo from '../Imgs/Icons/Logo.png';
import LogoDark from '../Imgs/Icons/LogoDark.png';
function MenuUp() {
  //se exisir o darkMode retorna true se não existir retorna false
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    //adiciona ou remove a classe dark-mode do body

    //se darkMode for true a classe é adicionada 
    //se darkMode for false a classe é removida
    document.body.classList.toggle('dark-mode', darkMode);
    
  }, [darkMode]);

  const toggleTheme = () => {
    //se o darkMode for false o newMode é true, e se o darkMode for true o newMode é false
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  return (
    <div className="Menu">
      <SideBarHome />
      {!darkMode && (
        <img src={Logo} width={'200px'} />
      )}
      {darkMode && (
        <img src={LogoDark} width={'200px'} />
      )}
      <UserSideBar />
      <button onClick={toggleTheme}>Mudar tema</button>
    </div>
  );
}

export default memo(MenuUp);
