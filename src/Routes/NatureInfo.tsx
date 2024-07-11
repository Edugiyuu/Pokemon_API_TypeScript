import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import '../Styles/NatureInfo.css'

interface UpAndDowns{
    name:string,
    url:string
}
interface NatureInfo{
    decreased_stat: UpAndDowns,
    increased_stat: UpAndDowns
}

function NatureInfo() {
  const [nature, setNature] = useState<NatureInfo>();
  const params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/nature/${params.nature}`)
      .then((response) => response.json())
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setNature(parsedResponse);
      });
  }, []);

  return (
    <div>
      <div className="NatureTitle">
        <h2>Nature: {params.nature}</h2>
      </div>
      
      {nature?.decreased_stat &&(
        <div className="StatInfo">
         <div className="StatsDown">
           <h3>A nature {params.nature} diminui:</h3>
           <p>{nature.decreased_stat.name}</p>
         </div>
            <div className="StatsUp" style={{ background: `#ffffff --img-grass center center/cover repeat` }}>

              <h3>Mas aumenta:</h3>
             <p>{nature.increased_stat.name}</p>
            </div> 
            
        </div>
        
      )}
        

    
    </div>
  );
}

export default NatureInfo;