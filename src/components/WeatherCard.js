import React from 'react';
import PropTypes from 'prop-types';
import './WeatherCard.scss';

import Sunny from '../assets/icons/sunny.svg';
import Cloudy from '../assets/icons/cloudy.svg';
import CloudRaining from '../assets/icons/cloudRaining.svg';
import CloudDrip from '../assets/icons/cloudDrip.svg';
import Lightning from '../assets/icons/lightning.svg';
import Snowflake from '../assets/icons/snowflake.svg';
import Fog from '../assets/icons/fog.svg';

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

const WeatherCard = ({ weather, temperature, description }) => {
    const WeatherIcon = getWeatherIcon(weather);

    return (
        <div className="weather-card">
            <div className="weather-icon">
                <img src={WeatherIcon} alt="Weather Icon" />
            </div>
            <div className="temperature">{temperature}</div>
            <div className="description">{description}</div>
        </div>
    );
};

WeatherCard.propTypes = {
    weather: PropTypes.oneOf([
        'Clear',
        'Clouds',
        'Rain',
        'Drizzle',
        'Thunderstorm',
        'Snow',
        'Mist',
        'Smoke',
        'Haze',
        'Dust',
        'Fog',
    ]).isRequired,
    temperature: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default WeatherCard;
