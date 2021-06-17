import React, { memo, useState,useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import './Map.css'
import dataset from '../../DatasSet Raw/greenhouse_gas_inventory_JSON.json';
import Constdata from '../../Constant/Constants';
const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const Map = ({ setTooltipContent,category,year }) => {
  const [yearNotice,setYearNotice]=useState("black")

  useEffect(() => {
    setYearNotice('red');
   setTimeout(()=>{setYearNotice('black')},3400)
  
}, [year])


  return (
    <div className='Map'>
   <div><p className='info'>Map representing <b>{category}</b> in year <b style={{color:yearNotice}}>{year}</b></p></div> 
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
                    
                    setTooltipContent(dataset[NAME] ? `${NAME} — ${dataset[NAME][category][year]}` :`${NAME}- nodata`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill:dataset[NAME]?'green':'#cccccc',
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
