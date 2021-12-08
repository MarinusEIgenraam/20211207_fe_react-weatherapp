///////////////////////
//// Build
import React, { useContext} from 'react';

///////////////////////
//// Environmental
import './WeatherDetail.css';
import iconMapper from "../../helpers/iconMapper";
import {TempContext} from "../../context/TempProvider";

function WeatherDetail({temp, type, description}) {
    console.log(type)
    const {kelvinToTempType} = useContext(TempContext);

    return (
        <section className="day-part">
      <span className="icon-wrapper">
        {iconMapper(type)}
      </span>
            <p className="description">{description}</p>
            <p>{kelvinToTempType(temp)}</p>
        </section>
    );
}

export default WeatherDetail;
