import GeoLocation from "../components/GeoLocation";
import FetchWeatherData from "../components/FetchWeatherData";
import FetchAllCities from "../components/FetchAllCities";
import styled from "styled-components";
const LandingPage = () => {
  return (
    <StyledLanding>
      <GeoLocation />
      <FetchWeatherData />
      <FetchAllCities />
    </StyledLanding>
  );
};
const StyledLanding = styled.div`
  background: linear-gradient(to bottom, #6161e7b8, #96815cc0, #e72222c6);
`;
export default LandingPage;
