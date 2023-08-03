import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const [weatherOptions, setWeatherOptions] = useState({
        temperature: false,
        humidity: false,
        // dewpoint: false,
        // windSpeed: false,
        // windDirection: false,
        // rain: false,
        // visibility: false,
    });

    const addMarker = (markerData) => {
        setMarkers((prevMarker) => [...prevMarker, markerData]);
    };

    const toggleWeatherOption = (option) => {
        setWeatherOptions((prevOptions) => ({
            ...prevOptions,
            [option]: !prevOptions[option],
        }));
    };
    useEffect(() => {
        console.log(weatherOptions);
    }, [weatherOptions]);

    return (
        <GlobalContext.Provider
            value={{ markers, addMarker, weatherOptions, toggleWeatherOption }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
