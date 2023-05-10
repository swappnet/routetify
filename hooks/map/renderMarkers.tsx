import { useAppSelector } from '../../redux/hooks'
import { useEffect } from 'react'

import * as L from 'leaflet'

const useRenderMarkers = (e: L.Map | null) => {
  const drawCoords = useAppSelector((state) => state.drawReducer.drawCoords)

  useEffect((): ReturnType<L.Map | any> => {
    const markersLayer = L.layerGroup()
    if (e) {
      drawCoords.forEach((coords: any, i) => {
        let lastIndex = drawCoords.length - 1
        if (i === 0) {
          return L.marker(coords, {
            alt: '',
            icon: L.icon({
              iconUrl: 'map/start-marker.svg',
              iconSize: [33, 33],
              iconAnchor: [6, 25],
            }),
            draggable: false,
          }).addTo(markersLayer)
        }
        if (i > 0 && i < lastIndex) {
          return L.marker(coords, {
            alt: '',
            icon: L.icon({
              iconUrl: 'map/mid-marker.svg',
              iconSize: [18, 18],
            }),
            draggable: false,
          }).addTo(markersLayer)
        }
        if (i === lastIndex && drawCoords.length > 1) {
          return L.marker(coords, {
            alt: '',
            icon: L.icon({
              iconUrl: 'map/finish-marker.svg',
              iconSize: [33, 33],
              iconAnchor: [13, 32],
            }),
            draggable: false,
          }).addTo(markersLayer)
        }
      })

      markersLayer.addTo(e)
      return () => e.removeLayer(markersLayer)
    }
  }, [drawCoords])
}

export default useRenderMarkers
