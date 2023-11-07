import Logo from './logo4.png'; 
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PastWeatherComponent from './PastWeatherComponet'; // Import the PastWeatherComponent
//import weatherSchema from 'server/models/weatherSchema.js';



function App() {                     
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [recommendation, setRecommendation] = useState('');
  const mongoose = require('mongoose');
  const [saveStatus, setSaveStatus] = useState(null);
  const [showPastWeather, setShowPastWeather] = useState(false); // Add this state variable
  const [pastData, setPastData] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  //const WeatherModel = require('./models/weatherSchema');

  const togglePastWeather = () => {
    setShowPastWeather(!showPastWeather);
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  
  
  
  useEffect(() => {
    if (data.main) {
      // Set a recommendation based on temperature
      if (data.main.temp <= 10) {
        setRecommendation('You may need a PARKA.');
      } else if (data.main.temp <= 35) {
        setRecommendation('You may need a WARM jacket.');
      } else if (data.main.temp <= 65) {
        setRecommendation('You may need a sweater.'); 
      } else {
        setRecommendation('You probably don\'t need a jacket. But follow your heart!');
      }
    }
  }, [data]);


  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setErrorMessage(''); // Reset the error message on a successful request
      })
      .catch((error) => {
        setErrorMessage('Location not found or there was an issue with the request.');
      });
    setLocation('');
    }
  }


  function saveWeather() {
    if (data && data.name && data.main && data.weather && data.main.humidity&& data.main.feels_like && data.wind) {
      //console.log('Data:', data); // Log the entire data object for debugging
      console.log('location:', data.name); // Log the temperature
      console.log('Temperature:', data.main.temp); // Log the temperature
      console.log('weather:', data.main.humidity); // Log the temperature
      console.log('humidity:', data.main.temp); // Log the temperature
      console.log('feels_like:', data.main.feels_like); // Log the temperature
      console.log('wind:', data.wind.speed); // Log the temperature
      console.log('recommendation:', recommendation); // Log the temperature
    }
    if (data && data.name) {
      axios.post('http://localhost:5000/save-weather', {
        location: data.name,
        temperature: data.main.temp,
        weather: data.weather[0].main,
        humidity: data.main.humidity,
        feels_like: data.main.feels_like,
        wind: data.wind.speed,
        recommendation: recommendation,
        date: new Date().toLocaleDateString(), // Include date
        time: new Date().toLocaleTimeString(), // Include time
        
      })
      .then((response) => {
        setSaveStatus('Weather data saved successfully.');
      })
      .catch((error) => {
        setSaveStatus('Error: Weather data could not be saved. :( ' );
        console.error('Error:', error);
      });
    }
  }
  
  return (
    <div className="app">
      <img src={Logo} width="207" height="126" />
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <HistoricWeather data={data} saveWeather={saveWeather} saveStatus={saveStatus} />
      <button onClick={fetchPastWeatherData}>Fetch Past Weather Data</button>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          
          </div>
          <div className="feels_like">
            <p>Feels Like :</p>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F </p> : null}
              
            </div>
            <div className="humidity">
              <p>Humidity : </p>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
            <p>Wind Speed :</p>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            </div> 
         <div className="recommendation">
            <p>Recomendation:</p>
            <p className='bold'>{recommendation }</p>
            </div>
            
            <p> ©FashionForecast Carrie Wasieloski 2023 </p> 
          </div>
        </div>
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

// function WeatherDataPage() {
//   const [weatherData, setWeatherData] = useState([]);

//   useEffect(() => {
//     axios.get('/get-weather-data')
//       .then((response) => {
//         setWeatherData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching weather data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Weather Data</h2>
//       <ul>
//         {weatherData.map((data) => (
//           <li key={data._id}>
//             Location: {data.location}, Temperature: {data.temperature}, Weather: {data.weather}
//             {/* Add other fields as needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
function fetchPastWeatherData() {
  axios.get('http://localhost:5000/get-past-weather-data')
    .then((response) => {
      const pastData = response.data;

    })
    .catch((error) => {
      console.error('Error fetching past weather data:', error);
    });
}

function HistoricWeather({ data, saveWeather, saveStatus }) {
  return (
    <div>
      <button onClick={saveWeather}>Save Weather</button>
      {saveStatus && <p>{saveStatus}</p>}
    </div>
  );
}

function PastWeather({fetchPastWeatherData}) {
      return (
        
        <button onClick={fetchPastWeatherData}>Past Weather</button>
        
      );
  }
  

export default App;














// import Logo from './logo4.png'; 
// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import PastWeatherComponent from './PastWeatherComponet'; // Import the PastWeatherComponent
// import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
// import PastWeatherComponet from './PastWeatherComponet'; 

// function App() {                     
//   const [data, setData] = useState({})
//   const [location, setLocation] = useState('')
//   const [recommendation, setRecommendation] = useState('');
//   const mongoose = require('mongoose');
//   const [saveStatus, setSaveStatus] = useState(null);
//   const [showPastWeather, setShowPastWeather] = useState(false); // Add this state variable
//   const [errorMessage, setErrorMessage] = useState('');
//   const [pastData, setPastData] = useState([]);

//   //const WeatherModel = require('./models/weatherSchema');

//   const togglePastWeather = () => {
//     setShowPastWeather(!showPastWeather);
//   };
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  
  
  
//   useEffect(() => {
//     if (data.main) {
//       // Set a recommendation based on temperature
//       if (data.main.temp <= 10) {
//         setRecommendation('You may need a PARKA.');
//       } else if (data.main.temp <= 35) {
//         setRecommendation('You may need a WARM jacket.');
//       } else if (data.main.temp <= 65) {
//         setRecommendation('You may need a sweater.'); 
//       } else {
//         setRecommendation('You probably don\'t need a jacket. But follow your heart!');
//       }
//     }
//   }, [data]);


//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios.get(url).then((response) => {
//         setData(response.data)
//         console.log(response.data)
//         setErrorMessage(''); // Reset the error message on a successful request
//       })
//       .catch((error) => {
//         setErrorMessage('Location not found or there was an issue with the request.');
//       });
//     setLocation('');
//     }
//   }


//   function saveWeather() {
//     if (data && data.name && data.main && data.weather && data.main.humidity&& data.main.feels_like && data.wind) {
//       //console.log('Data:', data); // Log the entire data object for debugging
//       console.log('location:', data.name); // Log the temperature
//       console.log('Temperature:', data.main.temp); // Log the temperature
//       console.log('weather:', data.main.humidity); // Log the temperature
//       console.log('humidity:', data.main.temp); // Log the temperature
//       console.log('feels_like:', data.main.feels_like); // Log the temperature
//       console.log('wind:', data.wind.speed); // Log the temperature
//       console.log('recommendation:', recommendation); // Log the temperature
//     }
//     if (data && data.name) {
//       axios.post('http://localhost:5000/save-weather', {
//         location: data.name,
//         temperature: data.main.temp,
//         weather: data.weather[0].main,
//         humidity: data.main.humidity,
//         feels_like: data.main.feels_like,
//         wind: data.wind.speed,
//         recommendation: recommendation,
//         date: new Date().toLocaleDateString(), // Include date
//         time: new Date().toLocaleTimeString(), // Include time
        
//       })
//       .then((response) => {
//         setSaveStatus('Weather data saved successfully.');
//       })
//       .catch((error) => {
//         setSaveStatus('Error: Weather data could not be saved. :( ' );
//         console.error('Error:', error);
//       });
//     }
//   }
  
//   return (
//     <div className="app">
//       <img src={Logo} width="207" height="126" />
//       <div className="search">
//         <input
//           value={location}
//           onChange={event => setLocation(event.target.value)}
//           onKeyPress={searchLocation}
//           placeholder='Enter Location'
//           type="text" />
//       </div>
//       <HistoricWeather data={data} saveWeather={saveWeather} saveStatus={saveStatus} />
//       <button onClick={fetchPastWeatherData}>Fetch Past Weather Data</button>

//       <div className="container">
//         <div className="top">
//           <div className="location">
//             <p>{data.name}</p>
//           </div>
//           <div className="temp">
//             {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
//           </div>
//           <div className="description">
//             {data.weather ? <p>{data.weather[0].main}</p> : null}
          
//           </div>
//           <div className="feels_like">
//             <p>Feels Like :</p>
//               {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F </p> : null}
              
//             </div>
//             <div className="humidity">
//               <p>Humidity : </p>
//               {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              
//             </div>
//             <div className="wind">
//             <p>Wind Speed :</p>
//               {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
            
//             </div>
            
//          <div className="recommendation">
//             <p>Recomendation:</p>
//             <p>{recommendation  }</p>
//             </div>
            
//             {/* <p> ©FashionForecast Carrie Wasieloski 2023 </p> */}
//           </div>
          
//           </div>
//   <Link to="/past-weather">View Past Weather Data</Link>

//   <Routes>
//     <Route path="/past-weather" element={<PastWeatherComponent pastData={pastData} />} />
//   </Routes>
// </div>
//   );
// }

// // function WeatherDataPage() {
// //   const [weatherData, setWeatherData] = useState([]);

// //   useEffect(() => {
// //     axios.get('/get-weather-data')
// //       .then((response) => {
// //         setWeatherData(response.data);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching weather data:', error);
// //       });
// //   }, []);

// //   return (
// //     <div>
// //       <h2>Weather Data</h2>
// //       <ul>
// //         {weatherData.map((data) => (
// //           <li key={data._id}>
// //             Location: {data.location}, Temperature: {data.temperature}, Weather: {data.weather}
// //             {/* Add other fields as needed */}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// function fetchPastWeatherData() {
//   axios.get('http://localhost:5000/get-past-weather-data')
//     .then((response) => {
//       const pastData = response.data;
//       setPastData(pastData); // Update the pastData state
//     })
//     .catch((error) => {
//       console.error('Error fetching past weather data:', error);
//     });
// }

// function HistoricWeather({ data, saveWeather, saveStatus }) {
//   return (
//     <div>
//       <button onClick={saveWeather}>Save Weather</button>
//       {saveStatus && <p>{saveStatus}</p>}
//     </div>
//   );
// }

// function PastWeather({fetchPastWeatherData}) {
//       return (
        
//         <button onClick={fetchPastWeatherData}>Past Weather</button>
        
//       );
//   }
  

// export default App;




   





// import Logo from './logo4.png';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PastWeatherComponent from './PastWeatherComponet.js'; // Make sure the filename and path are correct
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// function App() {
//   const [data, setData] = useState({});
//   const [location, setLocation] = useState('');
//   const [recommendation, setRecommendation] = useState('');
//   const [saveStatus, setSaveStatus] = useState(null);
//   const [showPastWeather, setShowPastWeather] = useState(false); // Add this state variable
//   const [errorMessage, setErrorMessage] = useState('');
//   const [pastData, setPastData] = useState([]);

//   const togglePastWeather = () => {
//     setShowPastWeather(!showPastWeather);
//   };

//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

//   useEffect(() => {
//     if (data.main) {
//       // Set a recommendation based on temperature
//       if (data.main.temp <= 10) {
//         setRecommendation('You may need a PARKA.');
//       } else if (data.main.temp <= 35) {
//         setRecommendation('You may need a WARM jacket.');
//       } else if (data.main.temp <= 65) {
//         setRecommendation('You may need a sweater.');
//       } else {
//         setRecommendation("You probably don't need a jacket. But follow your heart!");
//       }
//     }
//   }, [data]);

//   const searchLocation = (event) => {
//     if (event.key === 'Enter') {
//       axios
//         .get(url)
//         .then((response) => {
//           setData(response.data);
//           console.log(response.data);
//           setErrorMessage(''); // Reset the error message on a successful request
//         })
//         .catch((error) => {
//           setErrorMessage('Location not found or there was an issue with the request.');
//         });
//       setLocation('');
//     }
//   };

//   function saveWeather() {
//     if (data && data.name) {
//       axios
//         .post('http://localhost:5000/save-weather', {
//           location: data.name,
//           temperature: data.main.temp,
//           weather: data.weather[0].main,
//           humidity: data.main.humidity,
//           feels_like: data.main.feels_like,
//           wind: data.wind.speed,
//           recommendation: recommendation,
//           date: new Date().toLocaleDateString(), // Include date
//           time: new Date().toLocaleTimeString(), // Include time,
//         })
//         .then((response) => {
//           setSaveStatus('Weather data saved successfully.');
//         })
//         .catch((error) => {
//           setSaveStatus('Error: Weather data could not be saved. :(');
//           console.error('Error:', error);
//         });
//     }
//   }

//   function fetchPastWeatherData() {
//     axios
//       .get('http://localhost:5000/get-past-weather-data')
//       .then((response) => {
//         setPastData(response.data); // Update the pastData state
//       })
//       .catch((error) => {
//         console.error('Error fetching past weather data:', error);
//       });
//   }

//   return (
//     <div className="app">
//       <img src={Logo} width="207" height="126" />
//       <div className="search">
//         <input
//           value={location}
//           onChange={(event) => setLocation(event.target.value)}
//           onKeyPress={searchLocation}
//           placeholder="Enter Location"
//           type="text"
//         />
//       </div>
//       <HistoricWeather data={data} saveWeather={saveWeather} saveStatus={saveStatus} />
//       <button onClick={fetchPastWeatherData}>Fetch Past Weather Data</button>

//       <div className="container">
//         <div className="top">
//           <div className="location">
//             <p>{data.name}</p>
//           </div>
//           <div className="temp">
//             {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
//           </div>
//           <div className="description">
//             {data.weather ? <p>{data.weather[0].main}</p> : null}
//           </div>
//           <div className="feels_like">
//             <p>Feels Like:</p>
//             {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
//           </div>
//           <div className="humidity">
//             <p>Humidity:</p>
//             {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
//           </div>
//           <div className="wind">
//             <p>Wind Speed:</p>
//             {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
//           </div>
//           <div className="recommendation">
//             <p>Recommendation:</p>
//             <p>{recommendation}</p>
//           </div>
//         </div>
//       </div>
//       <Link to="/past-weather">View Past Weather Data</Link>
//       <Routes>
//         <Route path="/past-weather" element={<PastWeatherComponent pastData={pastData} />} />
//       </Routes>
//     </div>
//   );
// }

// function HistoricWeather({ data, saveWeather, saveStatus }) {
//   return (
//     <div>
//       <button onClick={saveWeather}>Save Weather</button>
//       {saveStatus && <p>{saveStatus}</p>}
//     </div>
//   );
// }

// export default App;
