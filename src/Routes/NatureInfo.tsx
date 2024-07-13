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
      
      {nature?.decreased_stat !== null ?(
        <div className="StatInfo">
         <div className="StatsDown">
           <h2>A nature {params.nature} diminui:</h2>
           <p>{nature?.decreased_stat.name}</p>
         </div>
            <div className="StatsUp" style={{background:''}}>

              <h2>Mas aumenta:</h2>
             <p>{nature?.increased_stat.name}</p>
            </div> 
            
        </div>
        
      ):(


         <div className="NullStat" style={{background: "nullImg"}}>
        
          <h2>Essa Nature não diminui nem aumenta stats.</h2>

         </div>
        )
      }
        

    
    </div>
  );
}

export default NatureInfo;