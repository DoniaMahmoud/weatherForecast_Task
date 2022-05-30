import styled from "styled-components";
import FetchWeatherData from "../components/FetchWeatherData";
import FetchAllCities from "../components/FetchAllCities";
const WeatherDashboard = () => {
  return (
    <StyledDashboard>
      <FetchWeatherData />
      <FetchAllCities />
    </StyledDashboard>
  );
};
const StyledDashboard = styled.div`
  background: linear-gradient(to bottom, #6161e7b8, #96815cc0, #e72222c6);
`;
export default WeatherDashboard;
