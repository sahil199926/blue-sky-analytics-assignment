import React, { useEffect, useState } from 'react'
import './Graph.css'
import country_data from "../../DatasSet Raw/greenhouse_gas_inventory_JSON.json"
import { Line } from "react-chartjs-2";
import Constdata from '../../Constant/Constants';
function Graph({ category, multipleCountries,ticked,singleCat}){
console.log(Object.values(country_data['Russia']['co2_without_land']))
  let renderData
  if (singleCat) {
    console.log(ticked,multipleCountries)
    renderData = []
    for (let i in multipleCountries) {
      renderData.push({
        label: multipleCountries[i],
        data: Object.values(country_data[multipleCountries[i]][ticked]),
        fill: true,
        backgroundColor: Constdata.Colors[i].backgroundColor,
        borderColor:Constdata.Colors[i].borderColor
      })
    }
  }
  else{
    console.log(ticked,multipleCountries,category)
 
    renderData = []
    for (let i in category) {
      console.log(multipleCountries[0])
      renderData.push({
        label: category[i],
        data: Object.values(country_data[multipleCountries[0]][category[i]]),
        fill: true,
        backgroundColor: Constdata.Colors[i].backgroundColor,
        borderColor:Constdata.Colors[i].borderColor
      })
    }

  }
  const [datasets, setDataset] = useState(renderData)
  const data = {
    labels: Constdata.years,
    datasets: datasets
  };

  function RenderGraph() {
    return (<Line data={data} />)
  }

  useEffect(() => {
    setDataset(renderData)
    RenderGraph()
  }, [ticked,category,singleCat ,multipleCountries])
  return (<>
    <div className='graph'>
    <p className='info' >This graph represent how the {category} have increased or decreased in {multipleCountries.map(i => <b>{i}, </b> )} over the span of years 1990-2014 </p>
      <RenderGraph />
     
    </div>
  </>
  )
}

export default React.memo(Graph);
