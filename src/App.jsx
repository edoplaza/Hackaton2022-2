import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Counties from './assets/counties.json'


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const App = () => {
  const mapContainer = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [25.279652, 54.687157],
      zoom: 10,
    });

    map.on("load", () => {

      //Counties
      map.addSource("counties", {
        type: "geojson",
        data: Counties,
      });

      map.addLayer({
        id: "lithuanian-counties",
        type: "fill",
        source: "counties",
        paint: {
          "fill-color": "#ffffff",
          "fill-opacity": 0.8,
          'fill-outline-color': 'red'
        },
        filter: ["==", "$type", "Polygon"],
      });

      //Cemeteries
      map.addSource("cemeteries", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [ 25.238212, 54.706052],
              },
            },
          ]
        }
      })

      map.addLayer({
        id: "vilinius-cemeteries",
        type: "circle",
        source: "cemeteries",
        paint: {
          "circle-radius": 6,
          "circle-color": "#0000ff",
        },
        filter: ["==", "$type", "Point"],
      });
      
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default App;
