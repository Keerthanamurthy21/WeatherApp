document.addEventListener('DOMContentLoaded', () => {
  fetchWeatherSummary(); // Call initially
  setInterval(fetchWeatherSummary, 5 * 60 * 1000); // Fetch every minute
});

const fetchWeatherSummary = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/weather-summary');
    console.log("Response Status:", response.status); // Log the response status

    if (!response.ok) { // Check if the response is OK (status 200-299)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather Summary Data:", data); // Log the data received

    const summaryDiv = document.getElementById('weather-summary');
    summaryDiv.innerHTML = '<h2>Current Weather Summary</h2>';

    data.forEach(item => {
      summaryDiv.innerHTML += `
        <p><strong>City:</strong> ${item.city}</p>
        <p><strong>Temperature:</strong> ${item.temp.toFixed(2)} °C</p>
        <p><strong>Feels Like:</strong> ${item.feels_like.toFixed(2)} °C</p>
        <p><strong>Weather:</strong> ${item.weather}</p>
        <p><strong>Timestamp:</strong> ${new Date(item.timestamp * 1000).toLocaleString()}</p>
        <hr>`;
    });
  } catch (error) {
    console.error("Error fetching weather summary:", error);
  }
};
