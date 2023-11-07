import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PastWeatherPage() {
  const [pastData, setPastData] = useState([]);

  useEffect(() => {
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
      <h2>Past Weather Data</h2>
      <ul>
        {pastData.map((data) => (
          <li key={data._id}>
            Location: {data.location}, Temperature: {data.temperature}, Weather: {data.weather}, Date: {data.date}, Time: {data.time}
            {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PastWeatherPage;
