import styled from "styled-components";
import FetchWeatherData from "../components/FetchWeatherData";
import GetAllCities from "../components/GetAllCities";
import ScrollTop from "../components/ScrollTop";
const WeatherDashboard = () => {
  return (
    <StyledDashboard>
      <FetchWeatherData />
      <GetAllCities />
      <ScrollTop />
    </StyledDashboard>
  );
};
const StyledDashboard = styled.div`
  background: linear-gradient(to bottom, #6161e7b8, #ca9232c0, #e72222c6);
`;
export default WeatherDashboard;
