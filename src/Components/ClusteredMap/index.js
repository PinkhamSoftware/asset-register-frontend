import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const generateRandomLong = () => {
  var num = (Math.random() * 3).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg === 0) {
    num = num * -1;
  }
  return num;
};

const generateRandomLat = () => {
  var num = (Math.random() * 3.5).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg === 0) {
    num = num * -1;
  }
  return num + 54.5;
};

const generatePositions = num => {
  let positions = [];
  for (let i = 0; i < num; i++) {
    positions.push({ lat: generateRandomLat(), lng: generateRandomLong() });
  }
  return positions;
};

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => {
    console.log("generating positions");
    const positions = generatePositions(props.positions);
    console.log("Positions generated");
    return (
      <GoogleMap
        defaultOptions={{ disableDefaultUI: true, mapTypeControl: false }}
        defaultZoom={7}
        defaultCenter={{ lat: 52.8, lng: -1.0 }}
      >
        <MarkerClusterer gridSize={70}>
          {positions.map(pos => (
            <Marker key={JSON.stringify(pos)} position={pos} />
          ))}
        </MarkerClusterer>
      </GoogleMap>
    );
  })
);

export default props => (
  <MapWithAMarker
    positions={props.positions}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div>loading</div>}
    containerElement={<div style={{ height: `800px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
