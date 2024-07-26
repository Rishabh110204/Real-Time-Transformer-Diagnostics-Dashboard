import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from "../../firebase"; // Adjust the path according to your project structure
import { Line } from 'react-chartjs-2';
import { Chart, defaults, elements, registerables } from 'chart.js';
import './Temp.css'; // Ensure this path is correct
import { tokens } from "../../theme";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";


Chart.register(...registerables);

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.align = "start";

const database = getDatabase(app);

 // Set the maximum number of data points to display
const TemperatureChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState({
    labels: [],
    ot: [],
    lvt: [],
    lv1t: [],
    lv2t: [],
    hvt: []
  });

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dataRef = ref(database, 'realtimedata');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.val();

        setChartData(prevState => {
          const labels = [...prevState.labels, new Date().toLocaleTimeString()];
          const ot = [...prevState.ot, newData.ot];
          const lvt = [...prevState.lvt, newData.lvt];
          const lv1t = [...prevState.lv1t, newData.lv1t];
          const lv2t = [...prevState.lv2t, newData.lv2t];
          const hvt = [...prevState.hvt, newData.hvt];

          // Ensure arrays do not exceed the maximum number of data points
          if (labels.length > 10) {
            labels.shift();
            ot.shift();
            lvt.shift();
            lv1t.shift();
            lv2t.shift();
            hvt.shift();
          }

          return {
            labels,
            ot,
            lvt,
            lv1t,
            lv2t,
            hvt
          };
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const lineOptions = (showScales) => ({
    responsive: true,
    maintainAspectRatio: true,
    elements: {
        line: {
          tension: 0.4, // Set the tension for the line (0.4 is an example value)
        }
      },
    plugins: {
      legend: {
        display: false // Hide legend to match the example image
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        display: showScales // Show x-axis on hover
        
      },
      y: {
        
        display: showScales, // Show y-axis on hover
        min: -40, // Set the minimum value for the y-axis
        max: 120, // Set the maximum value for the y-axis
      }
    }
  });

  const renderLineChart = (data, label, borderColor, backgroundColor) => {

    const currentTemperature = data[data.length - 1]; // Get the latest temperature
    return (
      <div
        className="chart-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        color="mode"
      >
        <h4>{label}</h4>
        <div className="summary">{currentTemperature}°C</div>
        <div className="summary-sub">Current Temperature</div>
        <Line
          data={{
            labels: chartData.labels,
            datasets: [{
              animation: true,
              label,
              data,
              borderColor,
              
              borderWidth: 2,
              fill: false
            }]
          }}
          options={lineOptions(hovered)}
        />
      </div>
    );
  };

  return (
    <div className="temperature-chart-wrapper" bgcolor={colors.primary[400]}>
      {renderLineChart(chartData.ot, 'Oil Temperature', 'rgba(75,192,192,1)', 'rgba(75,192,192,0.2)')}
      {renderLineChart(chartData.lvt, 'LV Winding Temperature', 'rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 0.2)')}
      {renderLineChart(chartData.lv1t, 'LV1 Winding Temperature', 'rgba(255, 206, 86, 1)', 'rgba(255, 206, 86, 0.2)')}
      {renderLineChart(chartData.lv2t, 'LV2 Winding Temperature', 'rgba(153, 102, 255, 1)', 'rgba(153, 102, 255, 0.2)')}
      {renderLineChart(chartData.hvt, 'HV Winding Temperature', 'rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 0.2)')}
    </div>
  );
}

export default TemperatureChart;
