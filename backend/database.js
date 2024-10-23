const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./weather.db');

// Create the tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS weather_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT,
      temp REAL,
      feels_like REAL,
      weatherCondition TEXT,
      timestamp INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS daily_summaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      city TEXT,
      avgTemp REAL,
      maxTemp REAL,
      minTemp REAL,
      dominantWeather TEXT,
      date TEXT
    )
  `);
});

// Function to save individual weather data
const saveWeatherData = (city, temp, feels_like, weatherCondition, timestamp) => {
  const sql = `INSERT INTO weather_data (city, temp, feels_like, weatherCondition, timestamp) VALUES (?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [city, temp, feels_like, weatherCondition, timestamp], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Function to save daily summaries
const saveDailySummary = (city, avgTemp, maxTemp, minTemp, dominantWeather, date) => {
  const sql = `INSERT INTO daily_summaries (city, avgTemp, maxTemp, minTemp, dominantWeather, date) VALUES (?, ?, ?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [city, avgTemp, maxTemp, minTemp, dominantWeather, date], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const getWeatherData = () => {
  const sql = `SELECT * FROM weather_data`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// Function to retrieve daily summaries
const getDailySummaries = () => {
  const sql = `SELECT * FROM daily_summaries`;
  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = { saveWeatherData, saveDailySummary, getDailySummaries,getWeatherData };
