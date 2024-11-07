import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; // Import the CSS file

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "9d4a2ce7d98b8dccbef476e19a87d970"; //9d4a2ce7d98b8dccbef476e19a87d970 Replace with your actual API key
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="input"
        />
        <button type="submit" className="button">
          Get Weather
        </button>
      </form>
      {weather && (
        <div className="weatherInfo">
          <div className="infocontainer">
            <div className="city">{weather.name}</div>
            <div className="details">
              <div className="weathertype">
                <h1>Weather type</h1> {weather.weather[0].description}
              </div>
              <div className="temperature">
                <h1>Temperature</h1> {weather.main.temp}°C
              </div>
              <div className="humidity">
                <h1>Humidity</h1> {weather.main.humidity}%
              </div>
              <div className="wind">
                <h1>Wind speed</h1> {weather.wind.speed} m/s
              </div>
              <div className="pressure">
                <h1>Pressure</h1> {weather.main.pressure} hPa
              </div>
              <div className="sunrise">
                <h1>Sunrise</h1>{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </div>
              <div className="sunset">
                <h1>Sunset</h1>{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </div>
              <div className="clouds">
                <h1>Clouds</h1> {weather.clouds.all}%
              </div>
              <div className="country">
                <h1>Country</h1> {weather.sys.country}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
