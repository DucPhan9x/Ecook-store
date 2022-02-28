import { Avatar } from "@material-ui/core";
import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import Geocode from "react-geocode";
import { useState } from "react";
import { useEffect } from "react";
import useNotification from "hooks/useNotification";
import ECookIcon from "assets/images/logoECook.png";

const options = { closeBoxURL: "", enableEventPropagation: true };
const optionsPolyline = {
  strokeColor: "red",
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: "#085daa",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

const Map = ({ infoCustomer, address, zoom }) => {
  // get lat lng from address
  const [data, setData] = useState({ lat: 0, lng: 0 });
  const [positions, setPositions] = useState([
    {
      lat: 16.0711691,
      lng: 108.1483103,
      label: "E-COOK System",
    },
  ]);

  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setData({ lat, lng });
        let temp = [...positions];
        temp.push({ lat, lng, label: infoCustomer?.fullName });
        setPositions(temp);
      },
      (error) => {
        useNotification.Error({
          title: "Message",
          message: "Get lat/lgn from address failed!",
        });
      }
    );
    // eslint-disable-next-line
  }, [address, infoCustomer]);

  return (
    <div>
      {data.lat > 0 && data.lng > 0 && (
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={{
            lat: data.lat,
            lng: data.lng,
          }}
        >
          <Marker
            position={{
              lat: data.lat,
              lng: data.lng,
            }}
          >
            {positions &&
              positions.map((position, index) => (
                <Marker position={new window.google.maps.LatLng(position)}>
                  <InfoBox options={options}>
                    <Avatar
                      alt="Avatar"
                      src={
                        position.label !== "E-COOK System"
                          ? infoCustomer?.imageUrl ||
                            "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
                          : ECookIcon
                      }
                    />
                  </InfoBox>
                </Marker>
              ))}
          </Marker>
          {positions?.length === 2 && (
            <Polyline path={positions} options={optionsPolyline} />
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
