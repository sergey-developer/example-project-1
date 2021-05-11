import React, { useEffect, useRef } from 'react';

import { MapContainer } from './GoogleMap.styled';

interface GoogleMapProps {
  className?: string;
  markers: {
    lat?: number | undefined;
    lng?: number | undefined;
  }[];
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className, markers }) => {
  const mapElementRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const initMap = () => {
    const uluru = { lat: 39.62428532403445, lng: -102.29040608599479 };

    if (mapElementRef.current) {
      const map = new google.maps.Map(mapElementRef.current, {
        zoom: 8,
        center: uluru,
        disableDefaultUI: true
      });
      mapRef.current = map;
    }
  };

  const setCenterPosition = ({ lat, lng }: { lat?: number; lng?: number }) => {
    mapRef.current &&
      lat &&
      lng &&
      mapRef.current.setCenter(
        new google.maps.LatLng({
          lat,
          lng
        })
      );
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      markers.forEach(item => {
        const lat = item?.lat;
        const lng = item?.lng;
        if (lat && lng) {
          new google.maps.Marker({
            position: new google.maps.LatLng({ lat, lng }),
            map: mapRef.current
          });
        }
      });
      setCenterPosition(markers[0]);
    }
  }, [markers, mapRef]);

  return <MapContainer ref={mapElementRef} className={className} />;
};

export default GoogleMap;
