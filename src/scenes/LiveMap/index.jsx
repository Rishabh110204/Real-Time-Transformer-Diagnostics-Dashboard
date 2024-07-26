import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { app } from '../../firebase'; // Adjust the path as per your project structure
import { getDatabase, ref, onValue, off } from "firebase/database";

const database = getDatabase(app);

const MapContainer = () => {
  const [coordinates, setCoordinates] = useState(null); // Initial state as null

  useEffect(() => {
    const fetchCoordinates = () => {
      const coordinatesRef = ref(database, 'coordinates'); // Reference to 'coordinates' node
      onValue(coordinatesRef, (snapshot) => {
        const coords = snapshot.val();
        if (coords) {
          setCoordinates({
            latitude: parseFloat(coords.latitude), // Ensure the latitude is a number
            longitude: parseFloat(coords.longitude) // Ensure the longitude is a number
          });
        }
      });

      return () => {
        off(coordinatesRef); // Detach listener
      };
    };

    fetchCoordinates();
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBt0EBeEOhb6s_nvQqPBh_vYMFQXFG6gBc"> {/* Replace with your Google Maps API key */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={coordinates ? 15 : 3} // Adjust zoom level as needed, zoom in if coordinates are available
        center={coordinates ? { lat: coordinates.latitude, lng: coordinates.longitude } : { lat: 0, lng: 0 }} // Default to (0,0) if coordinates are not yet available
      >
        {coordinates && (
          <Marker position={{ lat: coordinates.latitude, lng: coordinates.longitude }} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
