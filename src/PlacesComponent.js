import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import "./styles.css";
import GoogleMapReact from "google-map-react";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LocationSearchInput = () => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const cords = await getLatLng(results[0]);
    setCoordinates(cords);
    setAddress(value);
  };

  return (
    <div>
      <p>Address: {address} </p>
      <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lng}</p>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Google Places Search via Google Map",
                })}
              />
              {loading && <div>...loading</div>}
              {suggestions.map((item, idx) => {
                const style = item.active
                  ? { backgroundColor: "#FFD6AF", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                return (
                  <div {...getSuggestionItemProps(item, { style })} key={idx}>
                    {item.description}
                  </div>
                );
              })}
            </div>
          );
        }}
      </PlacesAutocomplete>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default LocationSearchInput;
