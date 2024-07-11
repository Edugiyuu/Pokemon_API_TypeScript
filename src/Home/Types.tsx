import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import useOpenClose from "../Hooks/useOpenClose";


// video: https://www.youtube.com/watch?v=0ZJgIjIuY7U&ab_channel=WebDevSimplified
interface TypeNameURL {
    name: string,
    url: string
}

interface AllTypes {
    results: TypeNameURL[]
}
const TypePage = () => {
    const [typeInfo, setTypeInfo] = useState<AllTypes>();
    const [type, setType] = useState("");
    const [confirmType, changeBoolean] = useOpenClose(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/?limit=18`)
            .then((response) => response.json())
            .then((parsedResponse) => {

                setTypeInfo(parsedResponse);
            })
    }, []);

    function handleClick(pokemonName: string) {
        setType(pokemonName);
        changeBoolean();
    }
    const [procurarPokemon, setProcurarPokemon] = useState('');
    const typePesquisado = () => {
        window.location.href = `/pokemon/type/${procurarPokemon.toLowerCase()}`;
    };
    return (

        <div>

            <header className="App-header">

                <div className="Titulo">

                    <TypeAnimation
                        sequence={[
                            'Procurando um tipo?',
                            10000,
                            'Que tal o tipo fogo?',
                            2000,
                            'Tipo grama talvez?',
                            2000,

                        ]}
                        wrapper="span"
                        speed={35}
                        style={{ fontFamily: "Raleway", fontSize: '2em', fontWeight: 'bold', display: 'inline-block', margin: '20px' }}
                        repeat={Infinity}
                    />
                    <div className="pesquisar">
                        <input placeholder="Escreva o tipo em ingles :)" type="text" value={procurarPokemon} onChange={(pokemonProcurado) => setProcurarPokemon(pokemonProcurado.target.value)} />
                        <button onClick={typePesquisado}>
                            Procurar
                        </button>
                    </div>

                </div>

            </header>
            <div >
                {typeInfo && (
                    <div className="Pokemon-buttons">

                        {typeInfo.results.map((pokemon) => (
                            <button className={`btn btn-header ${pokemon.name}`} id={pokemon.name} onClick={() => handleClick(pokemon.name)}>{pokemon.name}</button>
                        ))}
                    </div>
                )}
                <br></br>

            </div>
            {confirmType && (
                <div className='container'>

                    <div className='confirm-container'>
                        <h2>Quer ver mais sobre {type}?</h2>
                        <NavLink className={"NavLink"} to={`/pokemon/type/${type}`}>Sim</NavLink>
                        <button className="DeclineButton" onClick={changeBoolean} >Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypePage;