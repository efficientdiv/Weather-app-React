// import React from 'react';
// import { Link } from 'react-router-dom';
// import WeatherCard from '../components/WeatherCard';

// const Home = ({ weatherData }) => {
//     if (!weatherData) {
//         return <p>Loading...</p>;
//     }

//     const today = new Date().toDateString();
//     const nextFiveDays = weatherData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

//     return (
//         <div className="weather-container">
//             {nextFiveDays.map((item, index) => (
//                 <Link to={`/details/${item.dt_txt}`} key={index}>
//                     <WeatherCard
//                         date={item.dt_txt}
//                         temperature={item.main.temp}
//                         weather={item.weather[0].description}
//                         icon={item.weather[0].icon}
//                     />
//                 </Link>
//             ))}
//         </div>
//     );
// };

// export default Home;
