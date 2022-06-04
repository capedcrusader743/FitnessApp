import React from 'react'
import {Line} from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function Progress(props) {

  // const datas = {
  //   labels: [props.date],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [props.set],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)"
  //     }
  //   ]
  // };

  return (
    <div>
    {/* <Line data={datas}></Line> */}
    <div className='content-container'>
      <div className='row'>
        <div className='left-panel box'>
            {props.date}
        </div>
        <div className='right-panel box'>
            {props.set}
        </div>
      </div>
    </div>    
    </div>  
  )
}

export default Progress