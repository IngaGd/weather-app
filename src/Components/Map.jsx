import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';
import { useContext } from 'react';
import { useEffect, useRef } from 'react';
import locationIcon from '../assets/icons/location-point.png';
import { GlobalContext } from './GlobalContext';

export default function Map() {
    const { markers, addMarker, removeMarker } = useContext(GlobalContext);
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
            marker.bindPopup(
                'You clicked the map at ' + marker.getLatLng().toString()
            );
            addMarker(e.latlng);
            // setMapMarkers((markers) => [...markers, marker]);
        };
        if (!mapRef.current) {
            mapRef.current = L.map('map', {
                center: [51.505, -0.09],
                zoom: 2,
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
            const provider = new OpenStreetMapProvider();

            const searchControl = new GeoSearchControl({
                provider: provider,
                showMarker: true,
                showPopup: true,
                autoClose: true,
                retainZoomLevel: false,
                animateZoom: true,
                keepResult: false,
                searchLabel: 'Enter location',
            });
            mapRef.current.addControl(searchControl);

            mapRef.current.on('geosearch/showlocation', (e) => {
                const latlng = { lat: e.location.y, lng: e.location.x };
                const marker = L.marker(latlng, { icon: myIcon }).addTo(
                    mapRef.current
                );
                marker.bindPopup(
                    'You clicked the map at ' + marker.getLatLng().toString()
                );
                addMarker(latlng);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [myIcon, addMarker]);

    useEffect(() => {
        if (mapRef.current) {
            markers.forEach((markerData) => {
                if (
                    typeof markerData.lat !== 'undefined' &&
                    typeof markerData.lng !== 'undefined'
                ) {
                    const marker = L.marker([markerData.lat, markerData.lng], {
                        icon: myIcon,
                    }).addTo(mapRef.current);
                    marker.on('click', () => removeMarker(markerData.id));
                    marker.bindPopup(markerData.id);
                } else {
                    console.error('Invalid marker data:', markerData);
                }
                console.log('Adding marker to map:', markerData);
            });
        }
    }, [markers, myIcon, removeMarker]);

    return (
        <div className="section-map">
            <div className="row">
                <h3>
                    Please add a point to the map by clicking on the map, or
                    search bar input.
                </h3>
                <div id="map" className="map-container"></div>
            </div>
        </div>
    );
}
