const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WeatherData = require('./models/weatherSchema');
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your front-end URL
}));


//const PORT = process.env.PORT || 5000;
const PORT = 5000;


mongoose.connect("mongodb+srv://cgw2:iMW4epuOrfQindW3@cluster0.najaasc.mongodb.net/Weatherapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});
app.post('/save-weather', (req, res) => {
  console.log('Received a POST request at /save-weather');
  const { location, temperature, weather, humidity, feels_like, wind, recommendation, date, time  } = req.body;

  if (!location || !temperature || !weather || !humidity || !feels_like || !wind || !recommendation|| !date || !time) {
    return res.status(400).json({ message: 'Invalid data. Please provide all required fields.' });
  }

  // Create a new WeatherData document and save it to the database
  const newWeatherData = new WeatherData({
    location,
    temperature,
    weather,
    humidity,
    feels_like,
    wind,
    recommendation,
    date,
    time,
    // Add other relevant data fields
  });
  
  newWeatherData.save()
    .then(() => {
      res.status(200).json({ message: 'Weather data saved successfully.' });
    })
    .catch((error) => {
      console.error('Error saving weather data:', error);
      res.status(500).json({ message: 'Error saving weather data.' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/get-past-weather-data', async (req, res) => {
  try {
    const pastWeatherData = await WeatherData.find(); // Use Mongoose to query the data
    res.json(pastWeatherData); // Send the data as JSON
  } catch (error) {
    console.error('Error fetching past weather data:', error);
    res.status(500).json({ message: 'Error fetching past weather data.' });
  }
});


