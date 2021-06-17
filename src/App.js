import React, { useState } from "react";
import './App.css';
import Graph from './Components/Graph/Graph'
import Map from './Components/Map/Map'
import ReactTooltip from "react-tooltip";
import Controls from "./Components/Controls/Controls";
import Info from "./Components/Info/Info";
function App() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("carbon_dioxide_co2_emissions_without_land_use_land_use_change_and_forestry_lulucf_in_kilotonne_co2_equivalent");
  const [year, setYear] = useState("1990");
  const [multipleCountries,setMultipleCountries]=useState(['Australia']);
  return (

    <div className="App">
     <Info/>
      <div className='graph-option'>
        <div className='options'>
          <Controls
            setYear={setYear}
            setCategory={setCategory}
            setYear={setYear}
            setMultipleCountries={setMultipleCountries}
          />
        </div>

        <Graph
          category={category}
          multipleCountries={multipleCountries}
        />
      </div>
      <Map
        setTooltipContent={setContent}
        category={category}
         year={year}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
