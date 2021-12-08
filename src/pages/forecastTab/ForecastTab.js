///////////////////////
//// Build
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

///////////////////////
//// Environmental
import './ForecastTab.css';
import createDateString from "../../helpers/createDateString";
import {TempContext} from "../../context/TempProvider";

function ForecastTab({coordinates}) {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {kelvinToTempType} = useContext(TempContext);

    const {REACT_APP_API_KEY} = process.env;

    console.log(coordinates)


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getForecast() {
            setIsLoading(true);
            setError(false);
            const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${REACT_APP_API_KEY}&lang=nl`

            try {
                const result = await axios.get(API_URL, {cancelToken: source.token});
                setForecast(result.data.daily.slice(1, 6));
            } catch (e) {
                console.error(e);
                setError(true)
            }
            setIsLoading(false);
        }

        if (coordinates) {
            getForecast();
        }
        return function cleanup() {
            source.cancel();
            // clearInterval(loop);
        };
    }, [coordinates]);

    console.log(isLoading)

    return (
        <div className="tab-wrapper">
            {isLoading && <span>Loading....</span>}

            {forecast.map((day) => {
                return (
                    <>
                        <article key={day.dt}className="forecast-day">
                            <p className="day-description">
                                {createDateString(day.dt)}
                            </p>
                            <section className="forecast-weather">
                                <span>
                                    {kelvinToTempType(day.temp.day)}
                                </span>
                                <span className="weather-description">
                                    {day.weather[0].description}
                                </span>
                            </section>
                        </article>
                    </>

                )
            })}


        </div>
    );
};

export default ForecastTab;
