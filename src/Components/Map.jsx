import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import locationIcon from '../assets/icons/location-point.png';

export default function Map() {
    const mapRef = useRef(null);
    const myIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [20, 50],
    });

    useEffect(() => {
        const onMapClick = (e) => {
            L.popup().setLatLng(e.latlng).openOn(mapRef.current);
            const marker = L.marker(e.latlng, { icon: myIcon }).addTo(
                mapRef.current
            );
            marker
                .bindPopup('You clicked the map at ' + e.latlng.toString())
                .openPopup();
        };
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [51.505, -0.09],
                zoom: 13,
            });

            L.tileLayer(
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
                {
                    foo: 'bar',
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }
            ).addTo(mapRef.current);
            mapRef.current.on('click', onMapClick);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [myIcon]);

    return (
        <div className="section-map">
            <div className="row">
                <div id="map" className="map-container"></div>
            </div>
        </div>
    );
}
