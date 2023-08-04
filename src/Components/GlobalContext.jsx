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
    const [chartData, setChartData] = useState(null);

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

    function fetchHistoricalData(latitude, longitude, startDate, endDate) {
        fetch(
            `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.hourly.temperature_2m);

                const chartData = {
                    labels: data.hourly.time,
                    datasets: [
                        {
                            label: 'Temperature in C',
                            data: data.hourly.temperature_2m,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                };

                setChartData(chartData);
                console.log(chartData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        fetchHistoricalData(52.52, 13.41, '2021-12-30', '2021-12-31');
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                markers,
                addMarker,
                weatherOptions,
                toggleWeatherOption,
                data: chartData,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
