import { v4 as uuid } from "uuid";

const WeatherSummary = ({ data }) => {
  return (
    <div>
      {/* CURRENT CONDITION */}
      <h2>Current Condition</h2>
      {data.request.map((e) => (
        <p key={uuid()}>{e.query}</p>
      ))}
      {data.current_condition.map((e) =>
        e.weatherIconUrl.map((el) => <img key={uuid()} src={el.value} alt="" />)
      )}
      {data.current_condition.map((e) =>
        e.weatherDesc.map((el) => <p key={uuid()}>{el.value}</p>)
      )}
      {data.weather[0].hourly.map((e) => (
        <div key={uuid()}>
          <p>{e.time}</p>
          <p>{e.tempC}&deg;C</p>
          <p>{e.tempF}&deg;F</p>
          {e.weatherIconUrl.map((e) => (
            <img key={uuid()} src={e.value} alt="" />
          ))}
        </div>
      ))}
      {data.current_condition.map((e) => (
        <div key={uuid()}>
          <p>{e.temp_C}&deg;C</p>
          <p> {e.temp_F}&deg;F</p>
          <p>UV Index: {e.uvIndex}</p>
          <p>Humidity: {e.humidity}</p>
          <p>Visivility: {e.visibility}</p>
          <p>Feels Like: {e.FeelsLikeC}&deg;C</p>
          <p>Feels Like: {e.FeelsLikeF}&deg;F</p>
        </div>
      ))}

      {/* REST OF DAYS */}
      <h2>Rest of Days</h2>
      {data.weather.map((e) => (
        <div key={uuid()}>
          <p>{e.date}</p>
          <p>Max: {e.maxtempC}&deg;C</p>
          <p>Min: {e.mintempC}&deg;C</p>
          <p>Max: {e.maxtempF}&deg;F</p>
          <p>Min: {e.mintempF}&deg;F</p>
        </div>
      ))}
    </div>
  );
};
export default WeatherSummary;
