import RestCondition from "./RestCondition";
import CurrentCondition from "./CurrentCondition";
const WeatherSummary = ({ data }) => {
  return (
    <div>
      <CurrentCondition data={data} />
      <RestCondition data={data} />
    </div>
  );
};
export default WeatherSummary;
