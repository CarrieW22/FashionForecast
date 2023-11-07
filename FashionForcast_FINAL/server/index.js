// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const Todo = require('./models/weatherSchema');
// require("./common/db")();

// const app = express();
// const PORT = process.env.PORT || 5000;
// // password P9BpQ8eQjjkYquW5
// // Connects to MongoDB
// mongoose.connect('mongodb+srv://cgw2:iMW4epuOrfQindW3@cluster0.najaasc.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', (error) => {
//   console.error('MongoDB connection error:', error);
// });

// db.once('open', () => {
//   console.log('Connected to MongoDB database');
// });

// app.use(express.json());
// app.use(cors());
// app.listen(PORT, () => {
//   console.log('Server is running on port ${PORT}');
// });