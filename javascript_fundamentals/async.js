console.log('async.js loaded')

const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const latDisplay = document.getElementById('latDisplay');
const lonDisplay = document.getElementById('lonDisplay');

latDisplay.textContent = lat.value;
lonDisplay.textContent = lon.value;

lat.addEventListener('input', () => {
  latDisplay.textContent = lat.value;
});
lon.addEventListener('input', () => {
  lonDisplay.textContent = lon.value;
});

const getWeatherButton = document.getElementById('getWeatherButton');
getWeatherButton.addEventListener('click', getWeather);

import { API_KEY }from './config.js';

async function getWeather() {
  const cityName = document.getElementById('cityName').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=${API_KEY}`;
  console.log('Fetching weather data from:', url);
  console.log('lat:', lat.value, 'lon:', lon.value, 'cityName:', cityName)

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('HTTP error! status: ${response.status}');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherResult').textContent = 'Failed to load weather data.';
  }
}


function displayWeather(data) {
  const { name, main: {temp}, weather } = data;
  document.getElementById('weatherResult').textContent = `Weather in ${name}: ${temp}°C, ${weather[0].main}`;
  console.log('Weather data:', data);
}
