import React, { useState } from 'react';
import axios from 'axios';

function HistoricWeather({ data }) {
  const [saveStatus, setSaveStatus] = useState(null);

  const saveWeather = async () => {
    try {
      if (data && data.name) {
        const response = await axios.post('/save-weather', {
          location: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          recommendation: data.main.recommendation,
          // Add other relevant data
        });
        setSaveStatus('Weather data saved successfully.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSaveStatus('Error: Weather data could not be saved. Please check the server.');
    }
  };

  return (
    <div>
      <button onClick={saveWeather}>Save Weather</button>
      {saveStatus && <p>{saveStatus}</p>}
    </div>
  );
}

export default HistoricWeather;
