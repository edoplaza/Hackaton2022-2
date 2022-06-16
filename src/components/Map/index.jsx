import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Counties from "../../assets/data/counties.json";
import Bars from "../../assets/data/bars.json";
import Cemeteries from "../../assets/data/cemeteries.json";
import Clubs from "../../assets/data/clubs.json";
import tombstone from "../../assets/icons/tombstone.png";
import bar from "../../assets/icons/bar.png";
import club from "../../assets/icons/club.png";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = ({ layerId }) => {

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
          "fill-color": "transparent",
          'fill-outline-color': '#ff0000'
        },
        filter: ["==", "$type", "Polygon"],
      });

      //Cemeteries
      map.loadImage(tombstone, (error, image) => {
        if (error) throw error;
        map.addImage("tombstone", image);
        map.addSource("point", {
          type: "geojson",
          data: Cemeteries,
        });

        map.addLayer({
          id: "cemeteries-layer",
          type: "symbol",
          source: "point",
          layout: {
            "icon-image": "tombstone",
            "icon-size": 0.25,
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 13,
            "text-offset": [0, 0.5],
            "text-anchor": "top",
            "text-allow-overlap": true,
            "text-max-width": 6
          },
          paint: {
            "text-color": "#c9c87b"
          }
        });
      });

      //Clubs
      map.loadImage(club, (error, image) => {
        if (error) throw error;
        map.addImage("club", image);
        map.addSource("clubs", {
          type: "geojson",
          data: Clubs,
        });

        map.addLayer({
          id: "clubs-layer",
          type: "symbol",
          source: "clubs",
          layout: {
            "icon-image": "club",
            "icon-size": 0.25,
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 13,
            "text-offset": [0, 0.5],
            "text-anchor": "top",
            "text-allow-overlap": true,
            "text-max-width": 6
          },
          paint: {
            "text-color": "#aa79db"
          }
        });

        // if (layerId !== 'allLayers') {
        //   map.setLayoutProperty(layerId, 'visibility', 'none');
        // }
      });

      //Bars
       map.loadImage(bar, (error, image) => {
        if (error) throw error;
        map.addImage("bar", image);
        map.addSource("bars", {
          type: "geojson",
          data: Bars,
        });

        map.addLayer({
          id: "bars-layer",
          type: "symbol",
          source: "bars",
          layout: {
            "icon-image": "bar",
            "icon-size": 0.25,
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 13,
            "text-offset": [0, 0.5],
            "text-anchor": "top",
            "text-allow-overlap": true,
            "text-max-width": 6
          },
          paint: {
            "text-color": "#4e96f5"
          }
        });

        
      });
    });

    const barsLayer = document.querySelector('#bars-layer')
    barsLayer.addEventListener('click', () => {
      if (barsLayer.classList.contains('Sidebar__button--on')) {
        map.setLayoutProperty('bars-layer', 'visibility', 'none');
        barsLayer.classList.remove('Sidebar__button--on')
      } else {
        map.setLayoutProperty('bars-layer', 'visibility', 'visible');
        barsLayer.classList.add('Sidebar__button--on')
      }
    })

    const clubsLayer = document.querySelector('#clubs-layer')
    clubsLayer.addEventListener('click', () => {
      if (clubsLayer.classList.contains('Sidebar__button--on')) {
        map.setLayoutProperty('clubs-layer', 'visibility', 'none');
        clubsLayer.classList.remove('Sidebar__button--on')
      } else {
        map.setLayoutProperty('clubs-layer', 'visibility', 'visible');
        clubsLayer.classList.add('Sidebar__button--on')
      }
    })

    const cemeteriesLayer = document.querySelector('#cemeteries-layer')
    cemeteriesLayer.addEventListener('click', () => {
      if (cemeteriesLayer.classList.contains('Sidebar__button--on')) {
        map.setLayoutProperty('cemeteries-layer', 'visibility', 'none');
        cemeteriesLayer.classList.remove('Sidebar__button--on')
      } else {
        map.setLayoutProperty('cemeteries-layer', 'visibility', 'visible');
        cemeteriesLayer.classList.add('Sidebar__button--on')
      }
    })

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Map;
