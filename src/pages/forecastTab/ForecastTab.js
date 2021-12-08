import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";
import kelvinToCelsius from "../../helpers/kelvinToCelsius";
import createDateString from "../../helpers/createDateString";

function ForecastTab({coordinates}) {
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const API_KEY = 'ad91e97f999a924807f2f7f24cc5e3d2';

    console.log(coordinates)


    useEffect(() => {
        const source = axios.CancelToken.source();

        async function getForecast() {
            setIsLoading(true);
            setError(false);
            const API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,hourly&appid=${API_KEY}&lang=nl`

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
                                    {kelvinToCelsius(day.temp.day)}
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
