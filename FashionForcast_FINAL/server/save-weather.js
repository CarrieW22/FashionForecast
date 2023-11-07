const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());


// Create a model for your weather data
const WeatherData = mongoose.model('WeatherData', {
  location: String,
  temperature: Number,
  weather: String,
  humidity: Number,
  feels_like: String,
  wind: Number,
  recommendation: String,
  // Add more fields as needed
});

// Create a route to save weather data
const mongoose = require('mongoose'); // Import Mongoose
const WeatherData = require('./models/weatherSchema'); // Import your Mongoose model

const saveWeather = async () => {
  if (data && data.name) {
    // Create a new WeatherData document with the data
    const newWeatherData = new WeatherData({
      location: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].main,
      humidity: data.main.humidity,
      feels_like: data.main.feels_like,
      wind: data.wind.speed,
      recommendation: data.main.recommendation,
      
    });

    try {
      // Save the document to the MongoDB Atlas database
      await newWeatherData.save();
      setSaveStatus('Weather data saved successfully.');
    } catch (error) {
      console.error('Error:', error);
      setSaveStatus('Error: Weather data could not be saved.');
    }
  }
};

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
