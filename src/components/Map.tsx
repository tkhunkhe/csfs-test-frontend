import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import Box from "./Box";
import apiCalls from "../services/api-calls";

declare global {
  interface Window {
    L: any;
  }
}

var L = window.L;
L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;

const Map = () => {
  const mapRef = useRef<any>();
  const fetchAndAddMap = useCallback(async () => {
    const data = await apiCalls.getCurrentCheckpoints();
    // TODO: fetch users homes
    // NOTE: in the future, backend could send center along with the checkpoints
    // or frontend can compute the center from all these checkpoints
    const center = [45.522, -122.6519491026008];
    var elem = document.getElementById("map");
    mapRef.current = L.mapquest.map(elem, {
      center,
      layers: L.mapquest.tileLayer("map"),
      zoom: 14,
    });
    mapRef.current.addControl(L.mapquest.control());
    const multiple = data.map((cp) =>
      L.mapquest.textMarker([cp.lat, cp.long], {
        text: cp.name,
        // subtext: "Iconic coffeehouse chain",
        position: "right",
        type: "marker",
        icon: {
          primaryColor: "#4510ae",
          secondaryColor: "#4510ae",
          size: "sm",
          symbol: "C",
        },
      })
    );
    multiple.forEach((m) => {
      m.addTo(mapRef.current);
    });
  }, []);
  useEffect(() => {
    fetchAndAddMap();
  }, []);

  return (
    <Box>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default Map;
