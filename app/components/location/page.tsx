"use client"
import React, { useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const LocationLocator: React.FC = () => {
    const mapRef = useRef<google.maps.Map | null>(null);

    const handleLoad = (map: google.maps.Map) => {
        mapRef.current = map; // Store the map reference
    };

    const location = { lat: 18.4665, lng: 73.9038 }; // Example location

    return (
        <LoadScript googleMapsApiKey="b6A5UMPlj6IInKIGmxopyYooCP8uvUNWTniGQpDl6yA">
            <GoogleMap
                onLoad={handleLoad} // Handle map load event
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={location}
                zoom={13}
            >
                {/* You can add markers or other components here */}
            </GoogleMap>
        </LoadScript>
    );
};

export default LocationLocator;
