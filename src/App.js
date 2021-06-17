import React, { useState } from "react";
import './App.css';
import Graph from './Components/Graph/Graph'
import Map from './Components/Map/Map'
import ReactTooltip from "react-tooltip";
import Controls from "./Components/Controls/Controls";
import Info from "./Components/Info/Info";
import Constdata from "./Constant/Constants";
function App() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState([Constdata.categoryOption[0]]);
  const [year, setYear] = useState("1990");
  const [multipleCountries,setMultipleCountries]=useState(['Australia']);
  const [singleCat, setSingleTick] = useState(false)
  const [ticked, setTicked] = useState(Constdata.categoryOption[0])

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
            singleCat={singleCat}
            setSingleTick={setSingleTick}
            ticked={ticked}
            setTicked={setTicked}
          />
        </div>

        <Graph
          category={category}
          multipleCountries={multipleCountries}
          singleCat={singleCat}
          ticked={ticked}
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
