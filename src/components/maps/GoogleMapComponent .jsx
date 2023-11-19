import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import GoogleLayer from 'react-leaflet-google';

const GoogleMap = () => {
    return (
        <Map
            center={[37.7749, -122.4194]}
            zoom={8}
            style={{ width: '100%', height: '400px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <GoogleLayer googleMapsLoaderConf={{ apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' }} />
        </Map>
    );
};

export default GoogleMap;

