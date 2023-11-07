MERN Weather App: FashionForcast

This MERN (MongoDB, Express, React, Node.js) Weather App is a web application that allows users to fetch and display current weather data and save it to a MongoDB database.
Additionally, users can fetch and display past weather data, including location, temperature, weather, humidity, feels-like temperature, wind speed, recommendation, date, and time.

GIT Hub repo: https://github.com/CarrieW22/FashionForecast

Contents of the ZIP File
- Source code for the MERN Weather App.
	-Client
	    -scr
		-app.css
		-app.js	
		-various other files
	-server
	    -server.js
	    -variuos other files
- README.md (this file).


Before you begin, ensure you have met the following requirements:

Node.js: Install Node.js.
MongoDB: Install MongoDB.


Navigate to the Client and Server Folders:

Open two separate terminal or command prompt windows.

In one terminal, navigate to the "client" folder.
cd path/WEATHER_APP/client
>npx create-react-app client
npm install
Then copy the code from the zip file or git repo from the src folder into the Src file that is created
npm start


In the other terminal, navigate to the "server" folder.
cd path/WEATHER_APP/server
>npm init -y
Then copy the server folder from the zip or the github
Install Dependencies and Start the App:
node server.js


Usage
Access the app by opening a web browser and navigating to http://localhost:3000.
Enter a location and press "Enter" to fetch and display current weather data.
Click "Save Weather" to save the current weather data to the MongoDB database.
Future Work(Click "Fetch Past Weather Data" to fetch and display past weather data.)
Past weather data includes location, temperature, weather, humidity, feels-like temperature, wind speed, recommendation, date, and time.
API Endpoints
/save-weather: POST request to save current weather data to the database.
/get-past-weather-data: GET request to fetch past weather data from the database.
Dependencies
Server-side: Node.js, Express, MongoDB, Mongoose
Client-side: React, Axios


----------------------------------------------------------------------------------------
******If this error is encountered :

\WeatherApp\app\client>npm start

> client@0.1.0 start
> react-scripts start

Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options.allowedHosts[0] should be a non-empty string.



Run the following code in the terminal in the folder for the client folder:
rmdir /s /q node_modules   
del package-lock.json
Then delete the folders that dont get deleted in the node_modules folder
Then run these lines of code and install everything again:
npm install
npm install -g create-react-app
npm install express    
npm install mongoose  
npm install axios   
npm install cors  
npm update


//npm install express mongoose body-parser
//npm install react-router-dom      
//npm install -g nodemon   
//npm install --save-dev @babel/plugin-proposal-private-property-in-object

*OR* just start a new app and copy the src code file from client
and the server folder. IN other words follow the steps above.


----------------------------------------------------------------------------------------