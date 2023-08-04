import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useContext } from 'react';
import { useEffect, useRef } from 'react';
import locationIcon from '../assets/icons/location-point.png';
import { GlobalContext } from './GlobalContext';

export default function Map() {
    const { markers, addMarker } = useContext(GlobalContext);
    // const [mapMarkers, setMapMarkers] = useState([]);
    const mapRef = useRef(null);
    const myIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [20, 50],
    });

    useEffect(() => {
        const onMapClick = (e) => {
            console.log('e:', e);
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
    }, [myIcon, addMarker]);

    useEffect(() => {
        if (mapRef.current) {
            markers.forEach((markerData) => {
                console.log('Adding marker to map:', markerData);
                const marker = L.marker([markerData.lat, markerData.lng], {
                    icon: myIcon,
                }).addTo(mapRef.current);
                marker.bindPopup(
                    'You clicked the map at ' + marker.getLatLng().toString()
                );
            });
        }
    }, [markers, myIcon]);

    return (
        <div className="section-map">
            <div className="row">
                <div id="map" className="map-container"></div>
            </div>
        </div>
    );
}
