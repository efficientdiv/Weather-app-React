import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import WeatherDetail from './WeatherDetail';
import CloudDrip from './assets/icons/cloudDrip.svg';
import CloudFog from './assets/icons/cloudFog.svg';
import CloudLightning from './assets/icons/cloudLightning.svg';
import CloudMoon from './assets/icons/cloudMoon.svg';
import CloudMoonRaining from './assets/icons/cloudMoonRaining.svg';
import CloudRaining from './assets/icons/cloudRaining.svg';
import CloudSnowflake from './assets/icons/cloudSnowflake.svg';
import CloudSnowing from './assets/icons/cloudSnowing.svg';
import CloudSunRaining from './assets/icons/cloudSunRaining.svg';
import Cloudy from './assets/icons/cloudy.svg';
import CloudySunny from './assets/icons/cloudySunny.svg';
import Fog from './assets/icons/fog.svg';
import Lightning from './assets/icons/lightning.svg';
import Moon from './assets/icons/moon.svg';
import Snowflake from './assets/icons/snowflake.svg';
import Sunny from './assets/icons/sunny.svg';
import Windy from './assets/icons/windy.svg';
import LocationIcon from './assets/icons/Location.png';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric');
  const [isCelsius, setIsCelsius] = useState(unit === 'metric');
  const [city, setCity] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'a8c9a01177248450af96e640535f5794';
      let url;

      if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=${unit}&appid=${API_KEY}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
        setCurrentCity(data.name);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    };

    if (location.latitude !== 0 && location.longitude !== 0) {
      fetchWeather();
    }
  }, [location, unit, city]);

  useEffect(() => {
    const fetchForecast = async () => {
      const API_KEY = 'a8c9a01177248450af96e640535f5794';
      let url;

      if (city) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=${unit}&appid=${API_KEY}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching the forecast data:', error);
      }
    };

    if (location.latitude !== 0 && location.longitude !== 0) {
      fetchForecast();
    }
  }, [location, unit, city]);

  const toggleUnit = () => {
    const newUnit = isCelsius ? 'imperial' : 'metric';
    setIsCelsius(!isCelsius);
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
  };

  const handleLocationClick = () => {
    setCity('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return Sunny;
      case 'Clouds':
        return Cloudy;
      case 'Rain':
        return CloudRaining;
      case 'Drizzle':
        return CloudDrip;
      case 'Thunderstorm':
        return Lightning;
      case 'Snow':
        return Snowflake;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
        return Fog;
      default:
        return Sunny;
    }
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', { weekday: 'long', month: '2-digit', day: '2-digit' });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            weatherData ? (
              <>
                <div className="navbar">
                  <button className="toggle-button" onClick={toggleUnit}>
                    {isCelsius ? '°C' : '°F'}
                  </button>
                  <div className="search-container">
                    <img
                      src={LocationIcon}
                      alt="location-icon"
                      className="location-icon"
                      onClick={handleLocationClick}
                    />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search city..."
                      value={searchInput}
                      onChange={handleInputChange}
                      onKeyPress={handleSearch}
                    />
                  </div>
                </div>

                <div className="weather-card" onClick={() => navigate('/detail/0')}>
                  <div className="weather-icon">
                    <img
                      src={getWeatherIcon(weatherData.weather[0].main)}
                      alt="weather icon"
                    />
                  </div>
                  <div className="weather-info">
                    <div className="temperature">
                      {weatherData.main ? `${Math.round(weatherData.main.temp)}°${isCelsius ? 'C' : 'F'}` : 'N/A'}
                    </div>
                    <div className="description">
                      {weatherData.weather ? capitalizeFirstLetter(weatherData.weather[0].description) : 'N/A'}
                    </div>
                    <div className="date">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: '2-digit', day: '2-digit' })}
                    </div>
                    <div className="city">
                      {currentCity}
                    </div>
                  </div>
                </div>

                <div className="weather-cards">
                  {forecastData && forecastData.list.filter((item, index) => index % 8 === 0).slice(1, 5).map((forecast, index) => (
                    <div
                      key={index}
                      className="weather-card-forecast"
                      onClick={() => navigate(`/detail/${index + 1}`)}
                    >
                      <div className="date">
                        {getDate(forecast.dt_txt)}
                      </div>
                      <div className="weather-icon-card">
                        <img
                          src={getWeatherIcon(forecast.weather[0].main)}
                          alt="weather icon"
                        />
                      </div>
                      <div className="temperature">
                        {forecast.main ? (
                          <>
                            {Math.round(forecast.main.temp)}
                            <span>{isCelsius ? '°C' : '°F'}</span>
                          </>
                        ) : (
                          'N/A'
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className='loading'>Loading...</p>
            )
          }
        />
        <Route
          path="/detail/:dayIndex"
          element={<WeatherDetail forecastData={forecastData} unit={unit} />}
        />
      </Routes>
    </div>
  );
};

export default App;
