import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { WEATHER_FINAL_API } from "../API";
import { LocationContext } from "../contexts/LocationContext";
import WeatherSummary from "./WeatherSummary";
import { useParams } from "react-router-dom";
const FetchWeatherData = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const { stateContext, setCountryContext } = useContext(LocationContext);
  const format = "json";
  const NUM_OF_DAYS = 10;
  const final_url = `${WEATHER_FINAL_API}&q=${stateContext}&format=${format}&num_of_days=${NUM_OF_DAYS}`;
  const id_url = `${WEATHER_FINAL_API}&q=${id}&format=${format}&num_of_days=${NUM_OF_DAYS}`;

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        var data = JSON.stringify(response.data);
        var json = JSON.parse(data);
        let value = json.data.request[0].query.split(",");
        let count = value.length;
        setData(json.data);
        setCountryContext(value[count - 1]);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    if (id) {
      fetchData(id_url);
    } else if (stateContext !== null) {
      fetchData(final_url);
    }
  }, [stateContext, id]);
  return <div>{data && <WeatherSummary data={data} />}</div>;
};
export default FetchWeatherData;
