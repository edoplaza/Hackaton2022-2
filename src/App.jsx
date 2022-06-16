import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const App = () => {
  const mapContainer = useRef()
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [25.279652, 54.687157],
      zoom: 10,
    })

    map.on("load", () => {
      console.log('loaded')

      map.addSource("bus-routes", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/4347f3565fbe4d5dbb97b016768b8907_0.geojson",
      })

      map.addLayer({
        id: "bus-routes-line",
        type: "line",
        source: "bus-routes",
        paint: {
          "line-color": "#15cc09",
          "line-width": 4,
        },
      })
    })

    return () => map.remove()

  }, [])




  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />

}

export default App

