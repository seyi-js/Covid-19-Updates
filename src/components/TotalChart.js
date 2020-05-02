import React,{useState, useEffect} from 'react'
import { Bar} from 'react-chartjs-2'
export const TotalChart = ({critical, deaths,recovered, confirmed}) => {
    const [ chartData, setChartData ] = useState( {} )
    const [ options, setOptions ] = useState( {} )   

    
  useEffect( () => {
    getData()
  },[critical, deaths,recovered, confirmed])


  //Set Data to State
  const getData = () => {
    setChartData( {
      labels: [ 'Confirmed', 'Recovered', 'Critical', 'Deaths'],//End Of labels
      datasets: [ {
        label: 'No',
        data: [confirmed, recovered,critical,deaths],//End of Data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(25, 39, 200, 0.6)',
          'rgba(255, 109, 32, 0.6)',
          'rgba(75, 100, 232, 0.6)',
        ]//End of bgColor
      }]//End of dataSets
    } )///End of Set Chart Data
    
    setOptions( {
      title: {
        display: true,
        text: 'Chart Showing Covid-19 Statistics Globally',
        fontsize:30
      },// End Of title
      legend: {
        display: true,
        position: 'bottom'
      }// End Of legend
    })

   }// End Get Data
    return (
        <div className="chart">
        <Bar
        data={ chartData }
        options={options }
    />
        </div>
    )
}

export default TotalChart