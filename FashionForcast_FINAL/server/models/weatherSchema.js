const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: String,
  temperature: Number,
  weather: String,
  humidity: Number,
  feels_like: String,
  wind: Number,
  recommendation: String,
  date: String, // Add date as a String
  time: String, // Add time as a String
  // Add other fields as needed
});

const WeatherData = mongoose.model('Weather', weatherSchema);

module.exports = WeatherData;
