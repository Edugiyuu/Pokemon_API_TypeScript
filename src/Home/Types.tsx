import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


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
    const [confirmType, setConfirmType] = useState(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/?limit=18`)
            .then((response) => response.json())
            .then((parsedResponse) => {

                setTypeInfo(parsedResponse);
            })
    }, []);

    function handleClick(pokemonName: string) {
        setType(pokemonName);
        setConfirmType(true);
    }

    function OpenClose() {
        setConfirmType(true);
        if (confirmType === true) {
            setConfirmType(false)
        }

    }
    const [procurarPokemon, setProcurarPokemon] = useState('');
    const typePesquisado = () => {
        window.location.href = `/pokemon/type/${procurarPokemon.toLowerCase()}`;
    };
    return (

        <div>

            <header className="App-header">

                <div className="Titulo">

                    <h1>Procurando um tipo?</h1>
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
                        <NavLink to={`/pokemon/type/${type}`}>Sim</NavLink>
                        <button onClick={() => OpenClose()} >Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TypePage;