import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export default function WeatherDataBar() {
    const { weatherOptions, toggleWeatherOption, dateRange, updateDateRange } =
        useContext(GlobalContext);
    // const [humidity, setHumidity] = useState(false);
    // const [dewpoint, setDewpoint] = useState(false);
    // const [windSpeed, setWindSpeed] = useState(false);
    // const [windDirection, setWindDirection] = useState(false);
    // const [rain, setRain] = useState(false);
    // const [visibility, setVisibility] = useState(false);

    return (
        <>
            <section className="section-bar">
                <div className="row">
                    <div className="bar-container">
                        <fieldset>
                            <legend>Choose forecast option</legend>
                            <div>
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={dateRange.startDate}
                                    onChange={(e) =>
                                        updateDateRange(
                                            e.target.value,
                                            dateRange.endDate
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={dateRange.endDate}
                                    onChange={(e) =>
                                        updateDateRange(
                                            dateRange.startDate,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="temperature"
                                    name="temperature"
                                    checked={weatherOptions['temperature_2m']}
                                    onChange={() =>
                                        toggleWeatherOption('temperature_2m')
                                    }
                                />
                                <label htmlFor="temperature">Temperature</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="humidity"
                                    name="humidity"
                                    checked={
                                        weatherOptions['relativehumidity_2m']
                                    }
                                    onChange={() =>
                                        toggleWeatherOption(
                                            'relativehumidity_2m'
                                        )
                                    }
                                />
                                <label htmlFor="humidity">Humidity</label>
                            </div>
                            {/* <div>
                                <input
                                    type="checkbox"
                                    id="dewpoint"
                                    name="dewpoint"
                                    onChange={() =>
                                        toggleWeatherOption('dewpoint')
                                    }
                                />
                                <label htmlFor="dewpoint">Dewpoint</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windSpeed"
                                    name="windSpeed"
                                    onChange={() =>
                                        toggleWeatherOption('windSpeed')
                                    }
                                />
                                <label htmlFor="windSpeed">Wind speed</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windDirection"
                                    name="windDirection"
                                    onChange={() =>
                                        toggleWeatherOption('windDirection')
                                    }
                                />
                                <label htmlFor="windDirection">
                                    Wind direction
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="rain"
                                    name="rain"
                                    onChange={() => toggleWeatherOption('rain')}
                                />
                                <label htmlFor="rain">Rain</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="visibility"
                                    name="visibility"
                                    onChange={() =>
                                        toggleWeatherOption('visibility')
                                    }
                                />
                                <label htmlFor="visibility">Visibility</label>
                            </div> */}
                        </fieldset>
                    </div>
                </div>
            </section>
        </>
    );
}
