import React from 'react';

export default function WeatherDataBar() {
    return (
        <>
            <section className="section-bar">
                <div className="row">
                    <div className="bar-container">
                        <fieldset>
                            <legend>Choose forecast option</legend>
                            <div>
                                <input
                                    type="checkbox"
                                    id="temperature"
                                    name="temperature"
                                />
                                <label htmlFor="temperature">Temperature</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="humidity"
                                    name="humidity"
                                />
                                <label htmlFor="humidity">Humidity</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="dewpoint"
                                    name="dewpoint"
                                />
                                <label htmlFor="dewpoint">Dewpoint</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windSpeed"
                                    name="windSpeed"
                                />
                                <label htmlFor="windSpeed">Wind speed</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="windDirection"
                                    name="windDirection"
                                />
                                <label htmlFor="windDirection">
                                    Wind direction
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" id="rain" name="rain" />
                                <label htmlFor="rain">Rain</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="visibility"
                                    name="visibility"
                                />
                                <label htmlFor="visibility">Visibility</label>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </section>
        </>
    );
}
