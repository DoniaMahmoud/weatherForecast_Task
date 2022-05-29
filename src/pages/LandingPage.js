import GeoLocation from "../components/GeoLocation";
import FetchWeatherData from "../components/FetchWeatherData";
import FetchAllCities from "../components/FetchAllCities";
const LandingPage = () => {
  return (
    <div>
      <GeoLocation />
      <FetchWeatherData />
      <FetchAllCities />
    </div>
  );
};
export default LandingPage;
