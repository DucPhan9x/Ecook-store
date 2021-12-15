import { Avatar } from "@material-ui/core";
import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
const options = { closeBoxURL: "", enableEventPropagation: true };

const Map = ({ imageUrlAvatar, address, zoom }) => {
  return (
    <div>
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{ lat: 16.071367298751273, lng: 108.1483303695333 }}
      >
        <Marker position={{ lat: 16.071367298751273, lng: 108.1483303695333 }}>
          <InfoBox options={options}>
            <Avatar alt="Avatar" src={imageUrlAvatar} />
          </InfoBox>
        </Marker>
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
