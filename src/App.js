///////////////////////
//// Build
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';

///////////////////////
//// Components
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import './App.css';
import ForecastTab from "./pages/forecastTab/ForecastTab";
import TodayTab from "./pages/todayTab/TodayTab";

import kelvinToCelsius from "./helpers/kelvinToCelsius";

const {REACT_APP_API_KEY} = process.env;

function App() {
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState('');
    const [error, setError] = useState(false);


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            setError(false);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${REACT_APP_API_KEY}&lang=nl`, {cancelToken: source.token,});
                console.log(result.data);

                setWeatherData(result.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            // const loop = setInterval(() => {
            //     console.log("Loading....result");
            // }, 1000);
        }

        if (location) {
            fetchData();
        } else {
            console.log("please.....")
        }
        return function cleanup() {
            source.cancel();
            // clearInterval(loop);
        };
    }, [location]);


    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation}/>
                    {error && <span className="wrong-location-error">Ai! Deze locatie ken ik niet</span>}

                    <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3>{weatherData.name}</h3>
                    <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
                </>
            }
          </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <Router>
                        <TabBarMenu/>
                        <div className="tab-wrapper">
                            <Routes>
                                <Route path="/" element={<ForecastTab coordinates={weatherData.coord}/>}/>
                                <Route  path="komende-week" element={<TodayTab coordinates={weatherData.coord}/>}/>
                            </Routes>
                        </div>
                    </Router>
                    <div className="tab-wrapper">
                    </div>

                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;