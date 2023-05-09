import { useState, useMemo } from 'react';

import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet'; // Leaflet import

//Hooks import
import { useAppSelector } from '@/redux/hooks';
import GetPositionByDragging from './GetDragPosition';
import useUpdateMapView from '../../../hooks/updateMapView';
import useRenderRouting from '../../../hooks/renderRouting';
import useClickedCoords from '../../../hooks/updateClickedCoords';
import useRenderPolyline from '../../../hooks/renderPolyline';
import useRenderMarkers from '../../../hooks/renderMarkers';

import StyleMap from './TileLayer';
import { MapContainer, ZoomControl } from 'react-leaflet';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import LocationMarker from './LocationMarker';
import useFitBoundsOnClick from '../../../hooks/fitBounds';

const LeafletMap = () => {
  const [map, setMap] = useState<L.Map | null>(null); // Create map Ref with state

  //---Hooks---
  useClickedCoords(map);
  useUpdateMapView(map);
  useRenderRouting(map);
  useRenderPolyline(map);
  useRenderMarkers(map);
  useFitBoundsOnClick(map);
  //---HooksEnd---

  const geocoderCoords = useAppSelector((state) => state.geocoderReducer); // Coords that can change map center
  const layer = useAppSelector((state) => state.controlsReducer);

  const mapWrapper = useMemo(
    () => (
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        center={[50, 30]}
        zoom={9}
        minZoom={2}
        scrollWheelZoom={true}
        ref={setMap}
      >
        <StyleMap />
        <GetPositionByDragging />
        <LocationMarker />
        <ZoomControl position="bottomright" />
      </MapContainer>
    ),
    [geocoderCoords, layer.layer]
  );

  return <>{mapWrapper}</>;
};

export { LeafletMap };
