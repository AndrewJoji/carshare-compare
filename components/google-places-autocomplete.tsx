import React, { useRef, useEffect, useCallback } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { MapLocation } from "@/types";

const libraries: ("places")[] = ["places"];


interface GooglePlacesAutocompleteProps {
  onSelect: (location: MapLocation) => void;
};

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({ onSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_PLACES_SECRET || "AIzaSyAivDvY5EXQwsVQRGlr_ZgHj0ug2M59_vQ", // Use an environment variable for the API key
    libraries,
  });
  const autoCompleteRef = useRef<HTMLInputElement | null>(null);

  const onPlaceChanged = useCallback(() => {
    if (!autoCompleteRef.current) return;
    const autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      types: ["address"],
      componentRestrictions: { country: "ca" },
    });

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location: MapLocation = {
          id: place.place_id || "unknown",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: place.formatted_address || "Unnamed location",
        };
        onSelect(location);
      } else {
        console.error("Place has no geometry");
        // Optionally, handle the case where the place has no geometry information
      }
    });
  }, [onSelect]);

  useEffect(() => {
    if (isLoaded) {
      onPlaceChanged();
    }
  }, [isLoaded, onPlaceChanged]);

  return <Input className="w-[280px] justify-start text-left font-normal" type="text" placeholder="Enter a location" ref={autoCompleteRef} />;
};

export default GooglePlacesAutocomplete;