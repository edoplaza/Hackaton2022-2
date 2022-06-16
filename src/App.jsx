import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Counties from "./assets/data/counties.json";
import Cemeteries from "./assets/data/cemeteries.json";
import tombstone from "./assets/icons/tombstone.png";

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

      // map.addLayer({
      //   id: "lithuanian-counties",
      //   type: "fill",
      //   source: "counties",
      //   paint: {
      //     "fill-color": "#ffffff",
      //     "fill-opacity": 0.3,
      //     'fill-outline-color': 'red'
      //   },
      //   filter: ["==", "$type", "Polygon"],
      // });

      //Cemeteries
      map.loadImage(tombstone, (error, image) => {
        if (error) throw error;
        map.addImage("tombstone", image);
        map.addSource("point", {
          type: "geojson",
          data: Cemeteries,
        });

        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "tombstone",
            "icon-size": 0.25,
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 12,
            "text-offset": [0, 2],
            "text-anchor": "bottom",
          },
          paint: {
            "text-color": "#ffffff"
          }
        });
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default App;
