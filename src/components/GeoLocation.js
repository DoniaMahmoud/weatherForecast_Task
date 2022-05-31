import axios from "axios";
import { useEffect, useContext } from "react";
import { GOOGLE_API_KEY } from "../API";
import { LocationContext } from "../contexts/LocationContext";
import { GOOGLE_BASE_URL } from "../API";
const GeoLocation = () => {
  const { setStateContext } = useContext(LocationContext);

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

  return <div>{/* <h4>Current Location</h4> */}</div>;
};

export default GeoLocation;
// <Address>
//   {stateContext && <p> {` ${stateContext}, ${country} `}</p>}

//   {latitude && longitude ? (
//     <img
//       src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=300x200&sensor=false&markers=color:red%7c${latitude},${longitude}&key=${GOOGLE_API_KEY}`}
//       alt=""
//     />
//   ) : (
//     ""
//   )}
// </Address>
