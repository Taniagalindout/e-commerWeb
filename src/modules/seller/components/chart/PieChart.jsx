import React ,{ useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";


const PieChart = () => {
const chartRef = useRef(null);
const chartInstance = useRef(null);

useEffect(()=>{
  if(chartInstance.current){
    chartInstance.current.destroy()
  }
  const myChartRef = chartRef.current.getContext('2d');
  chartInstance.current = new Chart(myChartRef,{
    type: "pie",
    data:{
      labels: ['Apple', 'Amazon', 'Paypal'],
      datasets: [
        {
          label: '# of votes',
          data: [12, 19, 2],
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
           
          ],
        }
      ]
    }
  })
  return ()=>{
    if(chartInstance.current){
      chartInstance.current.destroy()
    }
  }
},[]);

  return (
    <div>
    
   <canvas ref={chartRef} style={{
    width:"250px",
    height: "250px",
    display:"block"
   }}/>
  </div>
  );
}

export default PieChart;