import axios from "axios";
import { LocationContext } from "../contexts/LocationContext";
import { CITIES_API } from "../API";
import { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { Link } from "react-router-dom";
const FetchAllCities = () => {
  const { countryContext } = useContext(LocationContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (countryContext) {
      axios
        .get(`${CITIES_API}${countryContext}`)
        .then((response) => {
          var data = JSON.stringify(response.data);
          var json = JSON.parse(data);
          setCities(json);
        })
        .catch((err) => console.log(err.response));
    }
  }, [countryContext]);

  return (
    <MainContainer>
      <h4>Different Cities</h4>

      <StyledCities>
        {cities.map((element) => (
          <Link key={uuid()} to={`/city/${element}`}>
            <p>{element}</p>
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
  a {
    text-decoration: none;
  }
  @keyframes animate {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }
  p {
    font-size: 1.3rem;
    margin: 1rem 0rem;
    color: white;
  }
  a:hover {
    background-color: #daeeda84;
    border-radius: 4px;
    animation: animate 0.5s forwards;
  }
`;
export default FetchAllCities;
