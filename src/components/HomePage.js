import HPS_logo from "../assets/HPS_logo.png"
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase.js'; // Assuming this is your Firebase config file
import "./HomePage.css"
import { useTheme } from "@mui/material";
import { tokens } from "../theme.js";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import RealtimeTemp from "../scenes/RealtimeTemp"; 
import LiveLocationMap from "../scenes/LiveMap";


Chart.register(...registerables);

const database = getDatabase(app);

function HomePage() {
  const [data, setData] = useState({ot: '', lvt: '', lv1t: '', lv2t: '', hvt: '', hum: '', otha: '', lvtha: '', gora: '', moga: '', rly1: ''});
  const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const dataRef = ref(database, 'realtimedata');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.val();
        setData(newData);
      }
    });

    const coordRef = ref(database, 'coordinates');
    const coordUnsubscribe = onValue(coordRef, (snapshot) => {
      if (snapshot.exists()) {
        setCoordinates(snapshot.val());
      }
    });

    return () => {
      unsubscribe();
      coordUnsubscribe();
    };
  }, []);

  

  const getRowColor = (value, defaultColor, alertColor) => {
    return value === 0 ? alertColor : defaultColor;
  };

  return (
    <div className="homepage" color="mode">
      <header>
        <img src={HPS_logo} alt="" className='logo'/>
      </header>

      <main>
        <div className="data-box" color="mode">
          <h1 variant="h3" color={colors.grey[100]}>
            HPS Power
          </h1>

          <div className="data-row">
            <span className="data-label">Oil Temperature:</span>
            <span className="data-value" data-field={data.ot}>{data.ot !== -37 ? data.ot : ''}</span>
          </div>
          <div className="data-row">
            <span className="data-label">lv Winding Temperature:</span>
            <span className="data-value" data-field="lvt">{data.lvt !== -37 ? data.lvt : ''}</span>
          </div>
          <div className="data-row">
            <span className="data-label">lv1 Winding Temperature:</span>
            <span className="data-value" data-field="lv1t">{data.lv1t !== -37 ? data.lv1t : ''}</span>
          </div>
          <div className="data-row">
            <span className="data-label">lv2 Winding Temperature:</span>
            <span className="data-value" data-field="lv2t">{data.lv2t !== -37 ? data.lv2t : ''}</span>
          </div>
          <div className="data-row">
            <span className="data-label">hv Winding Temperature:</span>
            <span className="data-value" data-field="hvt">{data.hvt !== -37 ? data.hvt : ''}</span>
          </div>
          <div className="data-row">
            <span className="data-label">Humidity:</span>
            <span className="data-value" data-field="hum">{data.hum !== -37 ? data.hum : ''}</span>
          </div>
          <div className="data-row" id="otha-row" style={{backgroundColor: getRowColor(data.otha, '#f9f9f9', '#f8d7da')}}>
            <span className="data-label">Oil temperature high alarm</span>
          </div>
          <div className="data-row" id="lvtha-row" style={{backgroundColor: getRowColor(data.lvtha, '#f9f9f9', '#f8d7da')}}>
            <span className="data-label">Winding temperature high alarm</span>
          </div>
          <div className="data-row" id="gora-row" style={{backgroundColor: getRowColor(data.gora, '#f9f9f9', '#f8d7da')}}>
            <span className="data-label">GOR alarm</span>
          </div>
          <div className="data-row" id="moga-row" style={{backgroundColor: getRowColor(data.moga, '#f9f9f9', '#f8d7da')}}>
            <span className="data-label">Oil level low alarm</span>
          </div>
          <div className="data-row" id="rly1-row" style={{backgroundColor: getRowColor(data.rly1, '#f8d7da', '#f9f9f9')}}> 
            <span className="data-label">Cooler on indication</span>
          </div>
        </div>

        <div className="data-box">
          <h3>Current Coordinates</h3>
          <div className="data-row">
          <span className="data-label">Latitude:</span>
          <span className="data-value" data-field="latitude">{coordinates.latitude}</span>
          </div>
          <div className="data-row">
          <span className="data-label">Longitude:</span>
          <span className="data-value" data-field="longtude">{coordinates.longitude}</span>
            </div> 
        </div>

      </main>
    </div>
  );
}

export default HomePage;
