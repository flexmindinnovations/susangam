"use client"
import React, { useRef } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const LocationLocator: React.FC = () => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const API_KEY = "AIzaSyA7YBDTTrP16ifdFuCqXQPN3-F3zNxYRQI";

    const handleLoad = (map: google.maps.Map) => {
        mapRef.current = map; // Store the map reference
    };

    const location = { lat: 18.4665, lng: 73.9038 }; // Example location

    return (
        // <LoadScript googleMapsApiKey="b6A5UMPlj6IInKIGmxopyYooCP8uvUNWTniGQpDl6yA">
        //     <GoogleMap
        //         onLoad={handleLoad} // Handle map load event
        //         mapContainerStyle={{ height: '400px', width: '100%' }}
        //         center={location}
        //         zoom={13}
        //     >
        //         {/* You can add markers or other components here */}
        //     </GoogleMap>
        // </LoadScript>

        <APIProvider apiKey={API_KEY}>
            <Map
                style={{ width: '100vw', height: '100vh' }}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </APIProvider>

    );
};

export default LocationLocator;
