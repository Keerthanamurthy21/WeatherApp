# WeatherApp
# Real-Time Weather Monitoring System
This project is a real-time data processing system that monitors weather conditions and provides summarized insights using rollups and aggregates. It retrieves weather data from the OpenWeatherMap API and processes it for specific Indian metro cities. The system calculates daily aggregates, triggers alerts based on user-configurable thresholds, and displays the output through a web interface.
## Features
**Real-Time Weather Data Retrieval:** Fetches weather data every 5 minutes from OpenWeatherMap for metros like Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
**Daily Weather Summaries:** Provides daily rollups for average, maximum, minimum temperature, and the dominant weather condition.
**User-Configurable Alert Thresholds:** Allows users to set thresholds for temperature or weather conditions (e.g., alert if temperature exceeds 35°C for two consecutive updates).
**Alerts:** Console-based alerts or potential email notification system (extendable).
**Temperature Conversion:** Automatically converts temperatures from Kelvin to Celsius.
## Prerequisites
Before setting up the project, ensure you have the following installed on your machine:
[Node.js](https://nodejs.org/) (version 14 or later)
[npm](https://www.npmjs.com/get-npm)
[Visual Studio Code (VS Code)](https://code.visualstudio.com/)
[npx](https://www.npmjs.com/package/npx)
A free [OpenWeatherMap API Key](https://home.openweathermap.org/users/sign_up)(The system will continuously retrieve weather data from the OpenWeatherMap API. You will need to sign up for a free API key to access the data.)
Installation and Setup
### 1. Download and Unzip the Project
Download the ZIP file for the project.
Unzip the file to your desired location.
### 2. Open the Project in VS Code
Open the unzipped folder named `weatherapi`.
Inside `weatherapi`, there will be two folders:
`backend` (for the backend code)
`frontend` (for the frontend code)
### 3. Setup the Backend
Open the `backend` folder in a new VS Code window.
In the VS Code terminal for the `backend` folder, run the following command to install dependencies:
 npm install
  ```
After installing the dependencies, start the backend server by running:
  npm start
  ```
### 4. Setup the Frontend
Open the `frontend` folder in another VS Code window.
In the VS Code terminal for the `frontend` folder, run the following command to serve the frontend:
  npx http-server
  ```
The terminal will output an HTTP link. Follow that link to view the frontend interface.
## Usage
Once both the backend and frontend are running:
The backend will continuously fetch weather data at a 5-minute interval.
The frontend will display the real-time weather updates for the selected metros.
Alerts will be triggered if thresholds are breached, and daily weather summaries will be shown.
## Design Choices
### API Integration
The project uses the OpenWeatherMap API to fetch real-time weather data. Data is fetched every 5 minutes, and various parameters like temperature, humidity, and weather conditions are processed.
### Rollups and Aggregates
**Daily Summary:** For each city, the system calculates the average, maximum, and minimum temperatures. The dominant weather condition is determined based on the most frequently occurring condition throughout the day.
**Alerting System:** Alerts are triggered when user-defined thresholds (e.g., temperature > 35°C) are exceeded for two consecutive updates.
### Architecture
**Backend:** Built with Express.js for handling API requests and data processing.
**Frontend:** A simple HTTP server to display weather data fetched from the backend.
**Storage:** The system can be extended to use databases (e.g., MongoDB, MySQL) for storing daily summaries and alert history.
## Dependencies
### Backend
`express`: For building the server.
`axios`: For making API requests to OpenWeatherMap.
`node-schedule`: To schedule the periodic weather data fetches.
`dotenv`: For loading environment variables (such as the OpenWeatherMap API key).
### Frontend
`http-server`: To serve the frontend files.
https://nodejs.org/
https://www.npmjs.com/get-npm
https://www.npmjs.com/package/npx
