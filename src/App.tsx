import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "./App.css";
import MenuUp from './NavBar/MenuUp';
import Pokemons from './Home/Pokemons';
import Types from './Home/Types';
import Natures from './Home/Natures';
import PokemonInfo from './Routes/PokemonInfo';

const App = () => {
  

  return (
   
    
    <BrowserRouter >
    <MenuUp></MenuUp>
   
    <Routes>
      <Route path="/" element={<Pokemons/>} />
      <Route path="pokemon/types/" element={<Types/>}/>
       <Route path="pokemon/nature/" element={<Natures/>}/>


            <Route path="pokemon/:name" element={<PokemonInfo />} />
    {/*   <Route path="pokemon/ability/:ability" element={<Abilities />}/>
      <Route path="pokemon/types/:type" element={<TypesInfo/>}/>
      <Route path="pokemon/nature/:nature" element={<NaturesInfo/>}/>
      <Route path="*" element={<Pagina404 />}/> */}
       
    </Routes>
      
    </BrowserRouter>
  );
};

export default App;
