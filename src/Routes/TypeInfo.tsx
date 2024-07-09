import { useState, useEffect } from "react";
import { useParams,} from "react-router-dom";
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
      <div className="MainType" style={{backgroundColor:`var(--type-${params.type})`,borderRadius:'9px'/* ,background: `url(../Imgs/${params.type}.png) center center/cover repeat` */}}>
      
        <h1>Tipo: {params.type}</h1>
        <Tooltip title={`Tipo: ${params.type}`}>
          <img className='MainIcon'src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${params.type}.svg`} width={100} height={100} />
        </Tooltip>
      </div>
      {types?.damage_relations && (
        <div >

          <div className="defenseHeader">
            <h2>Defesas do tipo {params.type}:</h2>
          </div>

          <div className="defInfo">
            <div className="Fraquesas">
              <h3>Fraco contra:</h3>
              {types.damage_relations.double_damage_from.map((damageType) => (
             <Tooltip title={`Tipo: ${damageType.name}`}>
               <img className="double_damage_from" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`}/>
             </Tooltip>
             
            ))}
            </div>

            
            <div className="Resistencias">
              
              <h3>Resistente contra:</h3>
              {types.damage_relations.half_damage_from.map((damageType) => (
              <Tooltip title={`Tipo: ${damageType.name}`}>
               <img className="half_damage_from" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`}/>
             </Tooltip>
            ))}
            </div>

           
          </div>

          <h2>Ataque</h2>
          <div className="ataqInfo">
            <div className="Efetivo">
              <h3>Moves do tipo {params.type} são super-efetivos contra:</h3>

              {types.damage_relations.double_damage_to.map((damageType) => (
              <Tooltip title={`Tipo: ${damageType.name}`}>
               <img className="double_damage_to" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`}/>
             </Tooltip>
            ))}

            </div>
            <div className="NaoEfetivo">

              <h3>Moves do tipo {params.type} não é efetivo contra:</h3>
              {types.damage_relations.half_damage_to.map((damageType) => (
              <Tooltip title={`Tipo: ${damageType.name} `}>
               <img className="half_damage_to" src={`https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/${damageType.name}.svg`}/>
             </Tooltip>
            ))}
            </div>

          </div>


        </div>
      )}
    </div>
  );
}

export default TypeInfo;
