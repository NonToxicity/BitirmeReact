import React, { useEffect, useRef, useState } from 'react';
import './Map.scss';

declare var google: any;

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
  setCountryName;
  setCityName;
}

interface IMarker {
  address: string;
  latitude: number;
  longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

export const MyMap: React.FC<IMap> = ({ mapType, mapTypeControl = false, setCountryName, setCityName }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<IMarker>();

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(39.92841, 32.834961);
    initMap(4, defaultAddress);
  };

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(map, 'click', function (e) {
        coordinateToAddress(e.latLng);
      });
    }
  };
  useEffect(initEventListener, [map]);

  const coordinateToAddress = async (coordinate: GoogleLatLng) => {
    const geocoder = new google.maps.Geocoder();
    await geocoder.geocode({ location: coordinate }, function (results, status, plus_code) {
      if (status === 'OK') {
        setMap(null);
        var details = results[0].address_components;
        var city;
        var country;
        for (var i = details.length - 1; i >= 0; i--) {
          for (var j = 0; j < details[i].types.length; j++) {
            if (details[i].types[j] == 'locality') {
              city = details[i].long_name;
            } else if (details[i].types[j] == 'sublocality') {
              city = details[i].long_name;
            } else if (details[i].types[j] == 'neighborhood') {
              city = details[i].long_name;
            } else if (details[i].types[j] == 'postal_town') {
              city = details[i].long_name;
              console.log('postal_town=' + city);
            } else if (details[i].types[j] == 'administrative_area_level_2') {
              city = details[i].long_name;
              console.log('admin_area_2=' + city);
            }
            // from "google maps API geocoding get address components"
            // https://stackoverflow.com/questions/50225907/google-maps-api-geocoding-get-address-components
            if (details[i].types[j] == 'country') {
              country = details[i].long_name;
            }
          }
        }

        setCountryName(country);
        setCityName(city);
        setMarker({
          address: results[0].formatted_address,
          latitude: coordinate.lat(),
          longitude: coordinate.lng(),
        });
      }
    });
  };

  const addSingleMarker = (): void => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
    }
  };
  useEffect(addSingleMarker, [marker]);

  const addMarker = (location: GoogleLatLng): void => {
    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
      icon: getIconAttributes('#000000'),
    });
  };

  const getIconAttributes = (iconColor: string) => {
    return {
      path: 'M11.0639 15.3003L26.3642 2.47559e-05L41.6646 15.3003L26.3638 51.3639L11.0639 15.3003 M22,17.5a4.5,4.5 0 1,0 9,0a4.5,4.5 0 1,0 -9,0Z',
      fillColor: iconColor,
      fillOpacity: 0.8,
      strokeColor: 'pink',
      strokeWeight: 2,
      anchor: new google.maps.Point(30, 50),
    };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative',
          mapTypeId: mapType,
          draggableCursor: 'pointer',
        })
      );
    }
  };

  return (
    <div className="map-container">
      <div ref={ref} className="map-container__map"></div>
    </div>
  );
};
