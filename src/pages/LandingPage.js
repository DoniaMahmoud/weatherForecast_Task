import GeoLocation from "../components/GeoLocation";
import FetchWeatherData from "../components/FetchWeatherData";
import GetAllCities from "../components/GetAllCities";
import styled from "styled-components";
import ScrollTop from "../components/ScrollTop";

const LandingPage = () => {
  return (
    <StyledLanding>
      <GeoLocation />
      <FetchWeatherData />
      <GetAllCities />
      <ScrollTop />
    </StyledLanding>
  );
};
const StyledLanding = styled.div`
  background: linear-gradient(to bottom, #6161e7b8, #ca9232c0, #e72222c6);
`;
export default LandingPage;
