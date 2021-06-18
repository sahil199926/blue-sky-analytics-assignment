import React, { memo, useState,useEffect } from "react";
import Constdata from "../../Constant/Constants";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import './Map.css'
import dataset from '../../DatasSet Raw/greenhouse_gas_inventory_JSON.json';
const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const Map = ({ setTooltipContent,mapCategory,year }) => {
  const [yearNotice,setYearNotice]=useState("black")
  const [colorDictnory,setColorDictnory]=useState({})
  useEffect(() => {
    setYearNotice('red');
   setTimeout(()=>{setYearNotice('black')},3400)
  
}, [year])

useEffect(() => {
 setColorDictnory({})
 let tempColorDictnory={}
  let sortedValue= Constdata.countryOption.map((i)=>dataset[i][mapCategory][year]);
  sortedValue.sort((a,b)=>a-b);
  for(let i in sortedValue){
    tempColorDictnory[sortedValue[i]]=120-2*i-10
  }
  setColorDictnory(tempColorDictnory) 

}, [year,mapCategory])

  return (
    <div className='Map'>
   <div><p className='info'>Map representing <b>{mapCategory}</b> in year <b style={{color:yearNotice}}>{year}</b></p></div> 
     <div className="MapLegand">
      <div className="MapLegandImg"  ><img style={{width:'140px'}} src="https://res.cloudinary.com/span/image/upload/v1624035863/Personal/colorPall_nyhywx.jpg"/><p>Less Value to High</p></div>
     <div className="MapLegandImg" ><img  src="https://res.cloudinary.com/span/image/upload/v1624035863/Personal/black_fzwzww.jpg"/><p>Value was in there in dataSet</p></div>
     <div className="MapLegandImg" > <img  src="https://res.cloudinary.com/span/image/upload/v1624035863/Personal/white_etmwnc.jpg"/><p>No data avalable</p></div>
     </div>
      <ComposableMap  data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const { NAME, POP_EST } = geo.properties;
                return(
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={"black"}
                  onMouseEnter={() => {
                    
                    setTooltipContent(dataset[NAME] ? `${NAME} — ${dataset[NAME][mapCategory][year]}` :`${NAME}- nodata`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill:dataset[NAME]?dataset[NAME][mapCategory][year]==0?'black':`rgb(${colorDictnory[dataset[NAME][mapCategory][year]]}%,0%,0%)`:'#cccccc',
                      outline: "black"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "black"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "black"
                    }
                  }}
                />
              )})
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
     
    </div>
  );
};

export default memo(Map);
