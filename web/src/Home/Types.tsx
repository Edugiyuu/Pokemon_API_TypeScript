import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';


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
    

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/type/?limit=18`)
            .then((response) => response.json())
            .then((parsedResponse) => {

                setTypeInfo(parsedResponse);
            })
    }, []);

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
                            <Link to={`/pokemon/type/${pokemon.name}`} id={"Pokemon-Link"} className={`btn btn-header ${pokemon.name}`}>{pokemon.name}</Link>
                        ))}
                    </div>
                )}
                <br></br>

            </div>
        </div>
    );
};

export default TypePage;