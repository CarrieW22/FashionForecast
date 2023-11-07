import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PastWeatherComponent() {
  const [pastData, setPastData] = useState([]);

  useEffect(() => {
    // Fetch past weather data here
    axios.get('http://localhost:5000/get-past-weather-data')
      .then((response) => {
        setPastData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching past weather data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Past Weather Data</h1>
      {pastData.map((data) => (
        <div key={data._id}>
          Location: {data.location}, Temperature: {data.temperature}, Weather: {data.weather}
          {/* Add other fields as needed */}
        </div>
      ))}
    </div>
  );
}

export default PastWeatherComponent;
