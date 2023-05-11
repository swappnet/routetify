import { useState, useEffect } from 'react'
import { updateDrawCoords } from '../../redux/features/drawSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { DrawType } from '@/types/global/index.types'

const useClickedCoords = (e: L.Map | null) => {
  const drawType = useAppSelector((state) => state.controlsReducer.draw)
  const dispatch = useAppDispatch()

  const [clickedCoords, setClickedCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)

  useEffect(() => {
    if (!e) return

    if (e) {
      if (drawType === DrawType.None) return
      if (drawType === DrawType.Hand) {
        e.on('click', (e: { latlng: { lat: number; lng: number } }) => {
          setClickedCoords({ lat: e.latlng.lat, lng: e.latlng.lng })
        })
      }
    }
  }, [e, drawType])

  useEffect(() => {
    if (!clickedCoords) return

    if (clickedCoords && drawType === DrawType.Hand) {
      dispatch(updateDrawCoords(clickedCoords))
    } else {
      setClickedCoords(null)
    }
  }, [clickedCoords])
}

export default useClickedCoords
