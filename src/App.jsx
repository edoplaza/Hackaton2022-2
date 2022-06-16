import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = 'pk.eyJ1IjoiZWRvcGxhemFjZ3RyYWRlciIsImEiOiJjbDRndm56Y2MwMDVhM2N0MzFhY3NycGVyIn0.hdpPu_Kiv3U9a1JdQIqRbA'

const App = () => {
  const mapContainer = useRef()
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-87.903982, 43.020403],
      zoom: 12,
    })
    return () => map.remove()

  }, [])
  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

}

export default App

