import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import locationIcon from '../assets/icons/location-point.png';
import { useState } from 'react';

export default function Map() {
    const mapRef = useRef(null);
    const myIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [20, 50],
    });

    const [coords, setCoords] = useState({
        lat: 54.6872,
        lng: 25.2797,
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
            setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
        };
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [coords.lat, coords.lng],
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
    }, [myIcon, coords]);

    return (
        <div className="section-map">
            <div className="row">
                <div id="map" className="map-container"></div>
                <div>latitude: {coords.lat}</div>
                <div>longtitude: {coords.lng}</div>
            </div>
        </div>
    );
}
