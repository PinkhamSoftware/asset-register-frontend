import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultOptions={{ disableDefaultUI: true, mapTypeControl: false }}
        defaultZoom={7}
        defaultCenter={{ lat: 52.8, lng: -1.0 }}
      >
        <MarkerClusterer gridSize={70}>
          {props.positions.map(pos => (
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
    containerElement={<div style={{ height: `500px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
