import React from 'react';
import Map from '../Components/Map';
import WeatherDataBar from '../Components/WeatherDataBar';
import WeatherDataGraph from '../Components/WeatherDataGraph';

export default function Home() {
    return (
        <>
            <WeatherDataBar />
            <Map />
            <WeatherDataGraph />
        </>
    );
}
