import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WEATHER_FINAL_API } from "../API";
import { LocationContext } from "../contexts/LocationContext";
import WeatherSummary from "./WeatherSummary";
const FetchWeatherData = () => {
  const [data, setData] = useState("");
  const { stateContext } = useContext(LocationContext);
  const format = "json";
  const NUM_OF_DAYS = 10;
  const final_url = `${WEATHER_FINAL_API}&q=${stateContext}&format=${format}&num_of_days=${NUM_OF_DAYS}`;

  useEffect(() => {
    if (stateContext !== null) {
      axios
        .get(final_url)
        .then((response) => {
          var data = JSON.stringify(response.data);
          var json = JSON.parse(data);
          setData(json.data);
        })
        .catch((err) => console.log(err.response));
    }
  }, [stateContext]);
  return <div>{data && <WeatherSummary data={data} />}</div>;
};
export default FetchWeatherData;
