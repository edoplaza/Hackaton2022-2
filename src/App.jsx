import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const mapContainer = useRef()
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [25.279652, 54.687157],
      zoom: 10,
    })
    return () => map.remove()

  }, [])
  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

}

export default App

