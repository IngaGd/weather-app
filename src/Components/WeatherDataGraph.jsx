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
    const { markers, data, weatherOptions, removeMarker } =
        useContext(GlobalContext);

    if (!data) {
        return null;
    }

    return (
        <section>
            <div className="row">
                {markers.map((marker, index) => (
                    <p key={index}>
                        Marker {index + 1}: Latitude - {marker.lat}, Longitude -{' '}
                        {marker.lng}{' '}
                        <button
                            className="btn"
                            onClick={() => removeMarker(marker.id)}
                        >
                            Remove Marker
                        </button>
                    </p>
                ))}
            </div>
            {Object.keys(weatherOptions).map(
                (option, index) =>
                    weatherOptions[option] && (
                        <div className="row" key={index}>
                            <h3>{option}</h3>
                            {data[option] && (
                                <Line
                                    data={data[option]}
                                    options={{
                                        elements: {
                                            line: {
                                                borderWidth: 1,
                                                backgroundColor:
                                                    'rgb(255, 165, 20)',
                                            },
                                            point: {
                                                radius: 0,
                                                pointStyle: 'none',
                                            },
                                        },
                                    }}
                                />
                            )}
                        </div>
                    )
            )}
        </section>
    );
}
