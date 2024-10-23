const axios = require('axios');
const db = require('./database');
const sqlite3 = require('sqlite3').verbose();
const dbs = new sqlite3.Database('./weather.db');
const alerts = require('./alerts');

const fetchWeatherData = async () => { 
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const apiKey ='be0daa7a32deb03ace221143ee549544';
  
const url= `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}`
  for (const city of cities) {
    try {
      const response = await axios.get(url);
      const { main, weather, dt } = response.data;
      const temp = main.temp - 273.15; // Convert from Kelvin to Celsius
      const feels_like = main.feels_like - 273.15;

      // Save the current weather data
      await db.saveWeatherData(city, temp, feels_like, weather[0].main, dt);
      
      alerts.checkThreshold(temp);

    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
    }
  }
};

// Function to calculate daily weather summaries
const calculateDailySummaries = async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  for (const city of cities) {
    try {
      // Updated SQL to include city filter
      const sql = `SELECT * FROM weather_data WHERE city = ? AND DATE(timestamp, 'unixepoch') = DATE('now', 'localtime')`;

      const dailyData = await new Promise((resolve, reject) => {
        dbs.all(sql, [city], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      console.log(dailyData, "dailyData");

      if (dailyData.length > 0) {
        const temperatures = dailyData.map(row => row.temp);
        const weatherConditions = dailyData.map(row => row.weatherCondition);

        const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
        const maxTemp = Math.max(...temperatures);
        const minTemp = Math.min(...temperatures);

        // Calculate the dominant weather condition
        const conditionCount = {};
        weatherConditions.forEach(condition => {
          conditionCount[condition] = (conditionCount[condition] || 0) + 1;
        });
        const dominantWeather = Object.keys(conditionCount).reduce((a, b) => conditionCount[a] > conditionCount[b] ? a : b);

        // Save the daily summary
        const date = Math.floor(Date.now() / 1000); // Current timestamp
        await db.saveDailySummary(city, avgTemp, maxTemp, minTemp, dominantWeather, date);
        console.log(`Daily summary for ${city} saved successfully.`);
      }
    } catch (error) {
      console.error(`Failed to calculate daily summary for ${city}:`, error);
    }
  }
};


// Fetch weather data every 5 minutes
setInterval(fetchWeatherData, 5 * 60 * 1000); 

// Calculate daily summaries at midnight
setInterval(calculateDailySummaries, 24 * 60 * 60 * 1000); // Runs daily

module.exports = { fetchWeatherData, calculateDailySummaries };
