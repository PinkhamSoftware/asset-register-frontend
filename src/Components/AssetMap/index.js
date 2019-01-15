import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultOptions={{ disableDefaultUI: true, mapTypeControl: false }}
        defaultZoom={12}
        defaultCenter={props.pos}
      >
        <Marker position={props.pos} />
      </GoogleMap>
    );
  })
);

export default props => (
  <MapWithAMarker
    pos={props.position}
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
      process.env.REACT_APP_MAPS_API_KEY
    }&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div>loading</div>}
    containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);
