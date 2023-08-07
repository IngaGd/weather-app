import React from 'react';
import Map from '../Components/Map';
import WeatherDataBar from '../Components/WeatherDataBar';
import WeatherDataGraph from '../Components/WeatherDataGraph';

export default function Home() {
    return (
        <>
            <div className="row u-text-center">
                <h1>Weather historical data app</h1>
            </div>
            <WeatherDataBar />
            <Map />
            <WeatherDataGraph />
        </>
    );
}
