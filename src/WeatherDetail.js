import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './WeatherDetail.scss';

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

const WeatherDetail = ({ forecastData }) => {
    const { dayIndex } = useParams();
    const dayForecast = forecastData.list.filter((item, index) => index % 8 === 0)[parseInt(dayIndex)];
    const unit = localStorage.getItem('unit') || 'metric';

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

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const convertTemperature = (temp, fromUnit, toUnit) => {
        if (fromUnit === toUnit) return temp;
        if (fromUnit === 'metric' && toUnit === 'imperial') {
            return (temp * 9 / 5) + 32; // Celsius to Fahrenheit
        }
        if (fromUnit === 'imperial' && toUnit === 'metric') {
            return (temp - 32) * 5 / 9; // Fahrenheit to Celsius
        }
        return temp;
    };

    return (
        <div className="weather-detail-card">
            <div className="weather-detail">
                <Link to="/" className="back-button">
                    Back
                </Link>
                <div className="date">
                    {new Date(dayForecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: '2-digit', day: '2-digit' })}
                </div>
                <div className="location">
                    {forecastData.city ? forecastData.city.name : 'Unknown Location'}
                </div>
                <div className="weather-icon">
                    <img
                        src={getWeatherIcon(dayForecast.weather[0].main)}
                        alt="weather icon"
                    />
                </div>
                <div className="temperature">
                    {dayForecast.main ? `${Math.round(convertTemperature(dayForecast.main.temp, 'metric', unit))}°${unit === 'metric' ? 'C' : 'F'}` : 'N/A'}
                </div>
                <div className="description">
                    {dayForecast.weather ? capitalizeFirstLetter(dayForecast.weather[0].description) : 'N/A'}
                </div>
                <div className="additional-info">
                    <div className="info-item">
                        <span>Min Temp:</span> {dayForecast.main ? `${Math.round(convertTemperature(dayForecast.main.temp_min, 'metric', unit))}°${unit === 'metric' ? 'C' : 'F'}` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Max Temp:</span> {dayForecast.main ? `${Math.round(convertTemperature(dayForecast.main.temp_max, 'metric', unit))}°${unit === 'metric' ? 'C' : 'F'}` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Feels Like:</span> {dayForecast.main ? `${Math.round(convertTemperature(dayForecast.main.feels_like, 'metric', unit))}°${unit === 'metric' ? 'C' : 'F'}` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Humidity:</span> {dayForecast.main ? `${dayForecast.main.humidity}%` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Wind Speed:</span> {dayForecast.wind ? `${dayForecast.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Pressure:</span> {dayForecast.main ? `${dayForecast.main.pressure} hPa` : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Sunrise:</span> {forecastData.city ? formatTime(forecastData.city.sunrise) : 'N/A'}
                    </div>
                    <div className="info-item">
                        <span>Sunset:</span> {forecastData.city ? formatTime(forecastData.city.sunset) : 'N/A'}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default WeatherDetail;
