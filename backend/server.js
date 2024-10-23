const express = require('express');
const weatherService = require('./weatherService'); // Your weather fetching logic
const db = require('./database');
const alerts = require('./alerts');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies

// Start fetching weather data every 5 minutes
setInterval(weatherService.fetchWeatherData, 5 * 60 * 1000);
setInterval(weatherService.calculateDailySummaries, 24*60 * 60 * 1000);
// Immediately call once to fetch data on startup
weatherService.fetchWeatherData();
weatherService.calculateDailySummaries();
app.get('/api/weather-summary', async (req, res) => {
  try {
    const summaries = await db.getWeatherData();
    console.log("Weather Summaries:", summaries); // Log the data to check if it's being fetched
    res.json(summaries);
  } catch (error) {
    console.error("Error fetching weather summaries:", error);
    res.status(500).send("Error fetching weather summaries");
  }
});
app.get('/api/weather-dailysummary', async (req, res) => {
  try {
    const summaries = await db.getDailySummaries();
    console.log("Weather Summaries:", summaries); // Log the data to check if it's being fetched
    res.json(summaries);
  } catch (error) {
    console.error("Error fetching weather summaries:", error);
    res.status(500).send("Error fetching weather summaries");
  }
});


app.post('/api/alerts', async (req, res) => {
  const { threshold } = req.body;
  alerts.setThreshold(threshold);
  res.send('Alert threshold set');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
