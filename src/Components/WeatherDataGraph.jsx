import React from 'react';
import { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function WeatherDataGraph() {
    const { markers, data } = useContext(GlobalContext);

    if (!data) {
        return null;
    }

    return (
        <section>
            <div className="row">
                {markers.map((marker, index) => (
                    <p key={index}>
                        Marker {index + 1}: Latitude - {marker.lat}, Longitude -{' '}
                        {marker.lng}
                    </p>
                ))}
            </div>
            <div className="row">{data && <Line data={data} />}</div>
        </section>
    );
}
