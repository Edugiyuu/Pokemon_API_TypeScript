import React, { useState, useEffect } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
import './TypesInfo.css'


function TypesInfo() {
  const [types, setTypes] = useState({});
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
    <div>
        <h1>{types.name}</h1>

      {types.damage_relations && (
        <div >
          
            <h2>Defesa:</h2>
            <div className="defInfo">
            <div className="Fraquesas">
            <img src="https://cdn-icons-png.flaticon.com/512/5468/5468624.png" alt="" />
              <h3>Fraco contra:</h3>
            </div>
            
                {types.damage_relations.double_damage_from.map((damageType) => (
                    <p>{damageType.name}</p>
                ))}
                <div className="Resistencias">
                <img src="https://cdn-icons-png.flaticon.com/512/5344/5344647.png" alt="" />
                  <h3>Resistente contra:</h3>
                </div>
                
                {types.damage_relations.half_damage_from.map((damageType) => (
                    <p>{damageType.name}</p>
                ))}
            </div>
            <h2>Ataque</h2>
            <div className="ataqInfo">
              <div className="SuperEfetivo">
              <img src="https://cdn-icons-png.flaticon.com/512/5344/5344647.png" alt="" />
                <h3>{types.name} moves are super-effective against:</h3>
              </div>
              
            {types.damage_relations.double_damage_to.map((damageType) => (
                    <p>{damageType.name}</p>
                ))}
                
            </div>
            <div className="NaoEfetivo">
            <img src="https://cdn-icons-png.flaticon.com/512/5468/5468624.png" alt="" />  
                <h3>{types.name} moves are not very effective against:</h3>
                {types.damage_relations.half_damage_to.map((damageType) => (
                    <p>{damageType.name}</p>
                ))}
              </div>
            

        </div>
      )}
    </div>
  );
}

export default TypesInfo;
