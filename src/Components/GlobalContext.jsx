import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [markers, setMarkers] = useState(() => {
        const savedMarkers = localStorage.getItem('markers');
        console.log('Retrieved markers from localStorage:', savedMarkers);
        return savedMarkers ? JSON.parse(savedMarkers) : [];
    });
    const [weatherOptions, setWeatherOptions] = useState({
        temperature: false,
        humidity: false,
        // dewpoint: false,
        // windSpeed: false,
        // windDirection: false,
        // rain: false,
        // visibility: false,
    });
    const [chartData, setChartData] = useState([]);

    const addMarker = (markerData) => {
        console.log('New marker data:', markerData);
        const id = uuidv4();
        setMarkers((prevMarker) => {
            const updateMarkers = [...prevMarker, { id, ...markerData }];
            localStorage.setItem('markers', JSON.stringify(updateMarkers));
            return updateMarkers;
        });
    };

    const removeMarker = (id) => {
        setMarkers((prevMarkers) => {
            const updateMarkers = prevMarkers.filter(
                (marker) => marker.id !== id
            );
            localStorage.setItem('markers', JSON.stringify(updateMarkers));
            return updateMarkers;
        });
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

                const newChartData = {
                    labels: data.hourly.time,
                    datasets: [
                        {
                            label: `Temperature in C at ${latitude},${longitude}`,
                            data: data.hourly.temperature_2m,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                };

                setChartData((prevChartData) => [
                    ...prevChartData,
                    newChartData,
                ]);
                // console.log(chartData);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        markers.forEach((marker) => {
            fetchHistoricalData(
                marker.lat,
                marker.lng,
                '2021-12-30',
                '2021-12-31'
            );
        });
    }, [markers]);

    return (
        <GlobalContext.Provider
            value={{
                markers,
                addMarker,
                weatherOptions,
                toggleWeatherOption,
                data: chartData,
                removeMarker,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
