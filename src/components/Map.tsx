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

const Map: React.FC<{ selectedUserId: null | number }> = ({
  selectedUserId,
}) => {
  const mapRef = useRef<any>();
  const [userPointsDetailMarkers, setUserPointsDetailMarkers] = useState();
  const [userHomesMarkers, setUserHomesMarkers] = useState<any[]>();
  const fetchAndAddMap = useCallback(async () => {
    const checkpoints = await apiCalls.getCurrentCheckpoints();
    const resUserHomes = await apiCalls.getUserHomes();
    // NOTE: in the future, backend could send center along with the checkpoints
    // or frontend can compute the center from all these checkpoints
    const center = [45.522, -122.6519491026008];
    var elem = document.getElementById("map");
    mapRef.current = L.mapquest.map(elem, {
      center,
      layers: L.mapquest.tileLayer("map"),
      zoom: 13,
    });
    mapRef.current.addControl(L.mapquest.control());
    const cpMarkers = checkpoints.map((cp) =>
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
    const uhMarkers = resUserHomes
      .filter((home) => home.lat && home.long)
      .reduce(
        (acc, home) => ({
          ...acc,
          [home.id]: L.mapquest.textMarker([home.lat, home.long], {
            text: home.username,
            position: "right",
            type: "marker",
            icon: {
              primaryColor: "#F29025",
              secondaryColor: "#F29025",
              size: "sm",
              symbol: home.id,
            },
          }),
        }),
        {}
      );
    setUserHomesMarkers(uhMarkers);
    [...cpMarkers, ...Object.values(uhMarkers)].forEach((m) => {
      m.addTo(mapRef.current);
    });
  }, []);

  const addAllHomeMarkersToMap = useCallback(() => {
    if (userHomesMarkers) {
      Object.values(userHomesMarkers).forEach((m) => {
        m.addTo(mapRef.current);
      });
    }
  }, [userHomesMarkers]);

  const switchSelectedHomeMarkers = useCallback(() => {
    if (userHomesMarkers) {
      Object.entries(userHomesMarkers).forEach(([userId, el]) => {
        if (userId !== `${selectedUserId}`) {
          el.remove();
        } else {
          el.addTo(mapRef.current);
        }
      });
    }
  }, [selectedUserId, userHomesMarkers]);

  const fetchUserPointsDetailAndAddToMap = useCallback(async () => {
    if (selectedUserId) {
      const resUserPointsDetail = await apiCalls.getUserPointsDetail(
        selectedUserId
      );
      // TODO: add to map
    }
  }, [selectedUserId]);

  useEffect(() => {
    fetchAndAddMap();
  }, []);

  useEffect(() => {
    console.log(`selectedUserId ${selectedUserId}`);
    if (
      selectedUserId !== null &&
      selectedUserId !== undefined &&
      userHomesMarkers
    ) {
      switchSelectedHomeMarkers();
      fetchUserPointsDetailAndAddToMap();
    } else if (selectedUserId === null) {
      addAllHomeMarkersToMap();
    }
  }, [selectedUserId]);

  return (
    <Box>
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default Map;
