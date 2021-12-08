///////////////////////
//// Build
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

///////////////////////
//// Environmental
import './TodayTab.css';
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import createTimeString from "../../helpers/createTimeString";
import {TempContext} from "../../context/TempProvider";

function TodayTab({coordinates}) {
    const [todaysWeather, setTodaysWeather] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {kelvinToTempType} = useContext(TempContext)
    const {REACT_APP_API_KEY} = process.env;

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchData() {
            const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${REACT_APP_API_KEY}`
            setIsLoading(true)
            setError(false);

            try {
                const result = await axios.get(API_URL, {cancelToken: source.token});
                setTodaysWeather([
                    result.data.hourly[3],
                    result.data.hourly[5],
                    result.data.hourly[7],
                ]);
                console.log(result.data)
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setIsLoading(false);
        }

        if (coordinates) {
            fetchData();
        }
        return function cleanup() {
            source.cancel();
            // clearInterval(loop);
        };

    }, [coordinates]);

    console.log(todaysWeather)
    return (
        <div className="tab-wrapper">

            <div className="chart">
                {todaysWeather.map((moment) => {
                    return (
                        <WeatherDetail
                            key={moment.dt}
                            temp={moment.temp}
                            type={moment.weather[0].main}
                            description={moment.weather[0].description}
                        />

                    )
                })}
            </div>
            <div className="legend">

                {todaysWeather.map((day) => {
                    return <span key={`${day.dt}-timestamp`}>{createTimeString(day.dt)}</span>
                })}
            </div>
            {isLoading && <span>Het weer laat even op zich wachten</span>}
            {error && <span>De weersvoorspelling is mislukt, probeer het nog eens</span>}
        </div>

    );
};

export default TodayTab;
