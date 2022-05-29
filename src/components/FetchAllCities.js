import axios from "axios";

import { LocationContext } from "../contexts/LocationContext";
import { CITIES_API } from "../API";
import { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

const FetchAllCities = () => {
  const { countryContext } = useContext(LocationContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (countryContext) {
      axios
        .get(`${CITIES_API}${countryContext}`)
        .then((response) => {
          var data = JSON.stringify(response.data);
          var json = JSON.parse(data);
          setCities(json);
        })
        .catch((err) => console.log(err.response));
    }
  }, [countryContext]);

  return (
    <div>
      <h2>Cities</h2>
      {cities.map((element) => (
        <p key={uuid()}>{element}</p>
      ))}
    </div>
  );
};
export default FetchAllCities;
