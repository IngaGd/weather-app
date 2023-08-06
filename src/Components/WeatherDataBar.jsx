import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export default function WeatherDataBar() {
    const { weatherOptions, toggleWeatherOption, dateRange, updateDateRange } =
        useContext(GlobalContext);

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
                                <label htmlFor="humidity">Humidity 2m</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windSpeed"
                                    name="windSpeed"
                                    checked={weatherOptions['windspeed_10m']}
                                    onChange={() =>
                                        toggleWeatherOption('windspeed_10m')
                                    }
                                />
                                <label htmlFor="windSpeed">Windspeed 10m</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windDirection"
                                    name="windDirection"
                                    checked={
                                        weatherOptions['winddirection_10m']
                                    }
                                    onChange={() =>
                                        toggleWeatherOption('winddirection_10m')
                                    }
                                />
                                <label htmlFor="windDirection">
                                    Winddirection 10m
                                </label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="rain"
                                    name="rain"
                                    checked={weatherOptions['rain']}
                                    onChange={() => toggleWeatherOption('rain')}
                                />
                                <label htmlFor="rain">Rain</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="snowfall"
                                    name="snowfall"
                                    checked={weatherOptions['snowfall']}
                                    onChange={() =>
                                        toggleWeatherOption('snowfall')
                                    }
                                />
                                <label htmlFor="snowfall">Snowfall</label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </section>
        </>
    );
}
