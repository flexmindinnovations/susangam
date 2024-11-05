"use client";
import React, { createContext, useContext } from 'react';
import invariant from 'invariant';

// Create the context
const MapContext = createContext<google.maps.Map | null>(null);

// Custom hook to use the map context
export function useGoogleMap(): google.maps.Map | null {
  const context = useContext(MapContext);
  invariant(context, 'useGoogleMap must be used within a MapProvider');
  return context;
}

// Define the props interface for the MapProvider
interface MapProviderProps {
  children: React.ReactNode; // Accept children of type ReactNode
  map: google.maps.Map | null; // Include the map prop
}

// Create the MapProvider component
export const MapProvider: React.FC<MapProviderProps> = ({ children, map }) => {
  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};
