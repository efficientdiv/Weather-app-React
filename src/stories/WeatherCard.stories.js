// src/stories/WeatherCard.stories.js

import React from 'react';
import WeatherCard from '../components/WeatherCard'; // Assuming this is your component
import { action } from '@storybook/addon-actions';

import Sunny from '../assets/icons/sunny.svg';
import Cloudy from '../assets/icons/cloudy.svg';
// Other weather icons imports


export default {
    title: 'WeatherCard',
    component: WeatherCard,
};

const Template = (args) => <WeatherCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    weatherData: {
        main: {
            temp: 25,
        },
        weather: [{
            main: 'Clear',
            description: 'clear sky',
        }],
        name: 'New York',
    },
};

export const Loading = Template.bind({});
Loading.args = {
    weatherData: null,
};

export const Error = Template.bind({});
Error.args = {
    error: 'Failed to fetch weather data',
};
