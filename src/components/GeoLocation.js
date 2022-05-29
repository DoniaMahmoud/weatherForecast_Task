import { useState, useEffect, useContext } from "react";
import { GOOGLE_API_KEY } from "../API";
import axios from "axios";
import { LocationContext } from "../contexts/LocationContext";
import { GOOGLE_BASE_URL } from "../API";
const GeoLocation = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const { setStateContext, setCountryContext } = useContext(LocationContext);
  useEffect(() => {
    const getUserAddress = (position) => {
      const location = `${position.coords.latitude},${position.coords.longitude}`;
      axios
        .get(`${GOOGLE_BASE_URL}${location}&sensor=true&key=${GOOGLE_API_KEY}`)
        .then((response) => {
          var data = JSON.stringify(response.data);
          var json = JSON.parse(data);
          var value = json.results[0].formatted_address.split(",");
          let count = value.length;
          setArea(value[count - 4]);
          setCity(value[count - 3]);
          setState(value[count - 2]);
          setCountry(value[count - 1]);
          setCountryContext(value[count - 1]);
          let splitState = value[count - 2].split(" ");
          setStateContext(splitState[count - 4]);
        })
        .catch((err) => console.log(err.response));
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getUserAddress(position);
      }, handleLocationErrors);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleLocationErrors = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  //   const displayLocation = () => {
  //     var geocoder, count, country, state, city;
  //     geocoder = new google.maps.Geocoder();
  //     var latlng = new google.maps.LatLng(latitude, longitude);

  //     geocoder.geocode({ latLng: latlng }, function (results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         if (results[0]) {
  //           var add = results[0].formatted_address;
  //           var value = add.split(",");

  //           count = value.length;
  //           country = value[count - 1];
  //           state = value[count - 2];
  //           city = value[count - 3];
  //           alert("city name is: " + city);
  //         } else {
  //           alert("address not found");
  //         }
  //       } else {
  //         alert("Geocoder failed due to: " + status);
  //       }
  //     });
  //   };

  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         getCoordinates,
  //         handleLocationErrors
  //       );
  //     } else {
  //       alert("Geolocation is not supported by this browser.");
  //     }
  //   };
  //   const getCoordinates = (position) => {
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   };
  return (
    <div>
      <p>Address: {`${area},${city},${state},${country} `}</p>
      {/* {latitude && longitude ? (
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&sensor=false&markers=color:red%7c${latitude},${longitude}&key=${GOOGLE_API_KEY}`}
          alt=""
        />
      ) : (
        ""
      )} */}
    </div>
  );
};
export default GeoLocation;
