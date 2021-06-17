import React, { useEffect, useState } from 'react'
import './Graph.css'
import country_data from "../../DatasSet Raw/greenhouse_gas_inventory_JSON.json"
import { Line } from "react-chartjs-2";
import Constdata from '../../Constant/Constants';
function Graph({ category, multipleCountries }) {
  let renderData
  if (multipleCountries.length) {
    renderData = []
    for (let i in multipleCountries) {
      renderData.push({
        label: multipleCountries[i],
        data: Object.values(country_data[multipleCountries[i]][category]),
        fill: true,
        backgroundColor: Constdata.Colors[i].backgroundColor,
        borderColor:Constdata.Colors[i].borderColor
      })
    }
  }
  const [datasets, setDataset] = useState([
    {
      label: 'Australia',
      data: Object.values(country_data['Australia'][category]),
      fill: true,
      backgroundColor: "rgba(49,52,198,0.2)",
      borderColor: "rgba(198,49,192,1)"
    },

  ])
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
  }, [category, multipleCountries])
  return (<>
    <div className='graph'>
    <p className='info' >This graph represent how the {category} have increased or decreased in {multipleCountries.map(i => <b>{i}, </b> )} over the span of years 1990-2014 </p>
      <RenderGraph />
     
    </div>
  </>
  )
}

export default React.memo(Graph);
