import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const TemperatureChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Oil Temperature',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'LV Winding Temperature',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'LV1 Winding Temperature',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'LV2 Winding Temperature',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'HV Winding Temperature',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzoqdlYbcupTbV3WarqBHAZ_9Qt1IbNXb1wi7BSSJOL7cTF650_-b9WMUTk9fmre3g_/exec');
        const data = await response.json();
        
        const validData = data.filter(entry => 
          entry.ot !== null && entry.ot !== undefined && entry.ot !== "" && 
          entry.lvt !== null && entry.lvt !== undefined && entry.lvt !== "" && 
          entry.lv1t !== null && entry.lv1t !== undefined && entry.lv1t !== "" && 
          entry.lv2t !== null && entry.lv2t !== undefined && entry.lv2t !== "" && 
          entry.hvt !== null && entry.hvt !== undefined && entry.hvt !== ""
        );

        const labels = validData.map(entry => new Date(entry.timestamp).toLocaleTimeString());
        const oilTemp = validData.map(entry => entry.ot);
        const lvTemp = validData.map(entry => entry.lvt);
        const lv1Temp = validData.map(entry => entry.lv1t);
        const lv2Temp = validData.map(entry => entry.lv2t);
        const hvTemp = validData.map(entry => entry.hvt);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Oil Temperature',
              data: oilTemp,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderWidth: 2,
              fill: true
            },
            {
              label: 'LV Winding Temperature',
              data: lvTemp,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderWidth: 2,
              fill: true
            },
            {
              label: 'LV1 Winding Temperature',
              data: lv1Temp,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderWidth: 2,
              fill: true
            },
            {
              label: 'LV2 Winding Temperature',
              data: lv2Temp,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderWidth: 2,
              fill: true
            },
            {
              label: 'HV Winding Temperature',
              data: hvTemp,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderWidth: 2,
              fill: true
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '80%', margin: 'auto', height: '90%' }}>
      <h3>Latest 15 Temperature Records</h3>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Time'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Temperature (°C)'
              }
            }
          }
        }}
      />
    </div>
  );
}

export default TemperatureChart;
