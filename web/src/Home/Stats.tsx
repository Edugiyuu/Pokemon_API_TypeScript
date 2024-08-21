import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import useOpenClose from '../Hooks/useOpenClose';

interface Stat {
    name: string;
    url: string;
  }
  
  interface StatsResults {
    results: Stat[];
  }

const Stats = () => {
    const [stats,setStats] = useState<StatsResults>({ results: [] })
    const [statName,setStatName] = useState('')
    const [confirmStat, changeBoolean] = useOpenClose(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/stat/`)
          .then((response) => response.json())
          .then((parsedResponse) => {
            console.log(parsedResponse);
            setStats(parsedResponse);
          })
          .catch((error) => console.error("Error", error));
      }, []);

      function handleClick(stat: string) {
        setStatName(stat)
        changeBoolean();
      }
  return (
    <div>
          <div className="Titulo">
              <TypeAnimation
                  sequence={[
                      'Procurando algum Stat?',
                      10000,
                      'Que tal saber mais sobre Stats?',
                      2000,
                  ]}
                  wrapper="span"
                  speed={35}
                  style={{ fontFamily: "Raleway", fontSize: '2em', fontWeight: 'bold', display: 'inline-block', margin: '20px' }}
                  repeat={Infinity}
              />
          </div>

    {stats && (
            <div className="Pokemon-buttons">
              
              {stats.results.map((stat) => (
                <button key={stat.name} onClick={() => handleClick(stat.name)}>{stat.name}</button>
              ))}
            </div>
          )}
    {confirmStat && (
          <div className='container'>
            
            <div className='confirm-container'>
             <h2>Quer ver mais sobre {statName}?</h2>
          
              <NavLink className={'NavLink'} to={`/pokemon/stat/${statName}`}>Sim</NavLink>
              <button className="DeclineButton" onClick={changeBoolean} >Não</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Stats