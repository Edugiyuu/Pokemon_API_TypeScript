import { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

import '../Styles/TypeInfo.css'

interface DamageInfo {
  damage_relations: {
    double_damage_from: DamageFrom[];
    half_damage_from: DamageFrom[];
    double_damage_to: DamageTo[];
    half_damage_to: DamageTo[];
  };
}


interface DamageFrom {
  name: string;
  url: string;
}

interface DamageTo {
  name: string;
  url: string;
}

function TypeInfo() {
  const [types, setTypes] = useState<DamageInfo>();
  const params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${params.type}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setTypes(parsedResponse);
      });
  }, []);

  return (
    <div >
      <div className="MainType" style={{ backgroundColor: `var(--background-${params.type})`, background: `var(--background-${params.type}) var(--img-${params.type}) center center`, borderRadius: '9px', backgroundSize: "165px",backgroundRepeat: 'repeat-x', }}>
        <div className="SubMainType">
          <h1>Tipo: {params.type}</h1>
          <Tooltip title={`Tipo: ${params.type}`}>
            <img className='MainIcon' src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${params.type}.svg`} width={100} height={100} />
          </Tooltip>
        </div>

      </div>
      {types?.damage_relations && (
        <div >

          <div className="defenseHeader">
            <h2>Defesas do tipo {params.type}:</h2>
          </div>

          <div className="defInfo">
            <div className="Fraquesas" >
              <div className="FraquesasDentro">
                <h3>Fraco contra:</h3>
                {types.damage_relations.double_damage_from.map((damageType) => (
                  <Tooltip title={`Tipo: ${damageType.name}`} >
                    <img className="double_damage_from" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`} />
                  </Tooltip>

                ))}
              </div>

            </div>

            <div className="Resistencias">
              <div className="ResistenciasDentro">
                <h3>Resistente contra:</h3>
                {types.damage_relations.half_damage_from.map((damageType) => (
                  <Tooltip title={`Tipo: ${damageType.name}`}>
                    <img className="half_damage_from" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`} />
                  </Tooltip>
                ))}
              </div>

            </div>

          </div>

          <div className="defenseHeader">
           <h2>Ataque</h2>
          </div>

          <div className="ataqInfo">
            <div className="Efetivo">
              <div className="EfetivoDentro">
                <h3> Super-efetivos contra:</h3>

                {types.damage_relations.double_damage_to.map((damageType) => (
                  <Tooltip title={`Tipo: ${damageType.name}`}>
                    <img className="double_damage_to" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`} />
                  </Tooltip>
                ))}
              </div>


            </div>
            <div className="NaoEfetivo">
              <div className="NaoEfetivoDentro">
              <h3>Não é efetivo contra:</h3>
              {types.damage_relations.half_damage_to.map((damageType) => (
                <Tooltip title={`Tipo: ${damageType.name} `}>
                  <img className="half_damage_to" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`} />
                </Tooltip>
              ))}
              </div>
              
            </div>

          </div>


        </div>
      )}
    </div>
  );
}

export default TypeInfo;
