import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';

export default function WeatherDataBar() {
    const { markers } = useContext(GlobalContext);
    return (
        <div className="row">
            {markers.map((marker, index) => (
                <p key={index}>
                    Marker {index + 1}: Latitude - {marker.lat}, Longitude -{' '}
                    {marker.lng}
                </p>
            ))}
        </div>
    );
}
