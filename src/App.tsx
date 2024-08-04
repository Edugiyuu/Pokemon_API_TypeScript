import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";
import MenuUp from './NavBar/MenuUp';
import Pokemons from './Home/Pokemons';
import Types from './Home/Types';
import Natures from './Home/Natures';
import PokemonInfo from './Routes/PokemonInfo';
import TypeInfo from './Routes/TypeInfo';
import NatureInfo from './Routes/NatureInfo';
import Stats from './Home/Stats';
import Register from './Routes/Register'
import Login from './Routes/Login'
import UserProfile from './Routes/UserProfile';
import Favorites from './Routes/Favorites'

const App = () => {
  

  return (
   
    
    <BrowserRouter >
    <MenuUp></MenuUp>
   
    <Routes>
      <Route path="/" element={<Pokemons/>} />
      <Route path="pokemon/types/" element={<Types/>}/>
       <Route path="pokemon/nature/" element={<Natures/>}/>
       <Route path="pokemon/stats/" element={<Stats/>}/>

       <Route path="pokemon/:name" element={<PokemonInfo />} />
       <Route path="pokemon/type/:type" element={<TypeInfo/>}/>
       <Route path="pokemon/nature/:nature" element={<NatureInfo/>}/>
       <Route path="pokemon/favorites" element={<Favorites/>}/>

       <Route path="register" element={<Register/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="profile" element={<UserProfile/>}/>

      {/*  <Route path="pokemon/ability/:ability" element={<Abilities />}/>
      
      
      <Route path="*" element={<Pagina404 />}/>   */}
       
    </Routes>
      
    </BrowserRouter>
  );
};

export default App;
