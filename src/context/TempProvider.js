import React, {createContext, useState} from 'react'
import kelvinToCelsius from "../helpers/kelvinToCelsius";
import kelvinToFahrenheit from "../helpers/kelvinToFahrenheit";

export const TempContext = createContext(null);

export default function TempContextProvider({children}) {
    const [tempType, setTempType] = useState('celsius');

    function toggleTemp() {
        if (tempType === 'celsius') {
            setTempType('fahrenheit');
        } else {
            setTempType('celsius')
        }
    }

    return(
        <TempContext.Provider value={{toggleTemp, kelvinToTempType: tempType === 'celsius' ? kelvinToCelsius : kelvinToFahrenheit}}>
            {children}
        </TempContext.Provider>
    )
}
