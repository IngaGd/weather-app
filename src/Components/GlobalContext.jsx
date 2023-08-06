import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [markers, setMarkers] = useState(() => {
        const savedMarkers = localStorage.getItem('markers');
        return savedMarkers ? JSON.parse(savedMarkers) : [];
    });
    const [dateRange, setDateRange] = useState({
        startDate: '2022-12-30',
        endDate: '2022-12-31',
    });

    const updateDateRange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };

    const [weatherOptions, setWeatherOptions] = useState({
        temperature_2m: false,
        relativehumidity_2m: false,
        windspeed_10m: false,
        winddirection_10m: false,
        rain: false,
    });
    const [chartData, setChartData] = useState(() => {
        const savedChartData = {};
        for (let option in weatherOptions) {
            savedChartData[option] = {
                labels: [],
                datasets: [],
            };
        }
        return savedChartData;
    });

    useEffect(() => {
        markers.forEach((marker) => {
            fetchHistoricalData(marker, weatherOptions, dateRange);
        });
    }, [markers, weatherOptions, dateRange]);

    const addMarker = (markerData) => {
        console.log('New marker data:', markerData);
        const id = uuidv4();
        const newMarker = { id, ...markerData };
        setMarkers((prevMarker) => {
            const updateMarkers = [...prevMarker, newMarker];
            localStorage.setItem('markers', JSON.stringify(updateMarkers));
            return updateMarkers;
        });
        fetchHistoricalData(newMarker, weatherOptions, dateRange);
    };

    const removeMarker = (id) => {
        setMarkers((prevMarkers) => {
            const updateMarkers = prevMarkers.filter(
                (marker) => marker.id !== id
            );
            localStorage.setItem('markers', JSON.stringify(updateMarkers));
            return updateMarkers;
        });
        setChartData((prevChartData) => {
            const updateChartData = {};
            for (let option in prevChartData) {
                updateChartData[option] = {
                    ...prevChartData[option],
                    datasets: prevChartData[option].datasets.filter(
                        (dataset) => !dataset.label.includes(`Marker ${id}:`)
                    ),
                };
            }
            return updateChartData;
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

    async function fetchHistoricalData(marker, weatherOptions, dateRange) {
        const { id, lat: latitude, lng: longitude } = marker;
        for (let option in weatherOptions) {
            if (weatherOptions[option]) {
                try {
                    const response = await fetch(
                        `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}&hourly=${option}`
                    );
                    const data = await response.json();
                    const dataset = {
                        label: `Marker ${id}: ${option} at ${latitude},${longitude}`,
                        data: data.hourly[option],
                        fill: false,
                        backgroundColor: 'rgb(75, 192, 192)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                    };

                    setChartData((prevChartData) => ({
                        ...prevChartData,
                        [option]: {
                            labels: data.hourly.time,
                            datasets: [
                                ...(prevChartData[option]?.datasets || []),
                                dataset,
                            ],
                        },
                    }));
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                markers,
                addMarker,
                weatherOptions,
                toggleWeatherOption,
                data: chartData,
                removeMarker,
                dateRange,
                updateDateRange,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
