// // src/pages/Details.js
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import WeatherDetails from '../components/WeatherDetails';

// const Details = ({ weatherData }) => {
//     const { date } = useParams();

//     if (!weatherData) {
//         return <p>Loading...</p>;
//     }

//     const details = weatherData.list.find((item) => item.dt_txt === date);

//     return details ? (
//         <WeatherDetails
//             date={date}
//             temperature={details.main.temp}
//             weather={details.weather[0].description}
//             icon={details.weather[0].icon}
//             humidity={details.main.humidity}
//             windSpeed={details.wind.speed}
//         />
//     ) : (
//         <p>No data available</p>
//     );
// };

// export default Details;
