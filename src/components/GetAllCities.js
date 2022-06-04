import { LocationContext } from "../contexts/LocationContext";
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import csc from "country-state-city";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

const GetAllCities = () => {
  const { countryContext } = useContext(LocationContext);
  const [countryId, setCountryID] = useState("");
  const [cities, setCities] = useState([]);
  const countries = csc.getAllCountries();

  function prepareData() {
    const country = countryContext.substring(1);
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name == country) {
        setCountryID(countries[i].id);
      }
    }
  }
  function getCities() {
    let allCities = csc.getStatesOfCountry(countryId);
    setCities(allCities);
  }
  useEffect(() => {
    if (countryContext) {
      prepareData();
    }
    if (countryId) {
      getCities();
    }
  }, [countryContext, countryId]);
  return (
    <MainContainer>
      <h4>Different Cities</h4>
      <StyledCities>
        {cities.map((element) => (
          <Link key={uuid()} to={`/city/${element.name}`}>
            <p>{element.name}</p>
          </Link>
        ))}
      </StyledCities>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);
  margin: 7rem 2rem 0rem 2rem;
  background: rgba(19, 28, 39, 0.7);
  color: white;
  padding: 1.5rem;
  border-radius: 5px;
  h4 {
    margin: 0rem 1.5rem;
    font-size: 1.2rem;
  }
`;
const StyledCities = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: center;
  margin: 2rem 0rem;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #c96666ba;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    background-color: #daeeda84;
    border-radius: 4px;
    animation: animate 0.5s forwards;
  }
  p {
    font-size: 1.3rem;
    margin: 1rem 0rem;
    color: white;
  }
  @keyframes animate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  @media screen and (max-width: 800px) {
    p {
      font-size: 2vw;
    }
  }
`;
export default GetAllCities;
