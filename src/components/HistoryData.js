import { useState } from "react";
import { useEffect } from "react";
import YearlyHistory from "./YearlyHistory";
import MonthlyHistory from "./MonthlyHistory";
import styled from "styled-components";
import { Switch } from "react-switch-input";

const HistoryData = ({ dataa }) => {
  const [toggle, setToggle] = useState(false);

  const handleChangeSwitch = (e) => {
    setToggle(!toggle);
  };
  return (
    <MainContainer>
      <Historical>
        <h3>Historical Weather Information </h3>
        <HistoricalData>
          <Toggle>
            <p>Current Year</p>
            <Switch onChange={handleChangeSwitch} />
            <p>Monthly</p>
          </Toggle>
          {toggle ? (
            <MonthlyHistory dataa={dataa} />
          ) : (
            <YearlyHistory dataa={dataa} />
          )}
        </HistoricalData>
      </Historical>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  margin-top: 7rem;
  p {
    display: inline-block;
  }
  h3 {
    margin: 0rem 1.5rem;
    font-size: 1.2rem;
    color: white;
    margin-top: 1rem;
  }
`;
const Toggle = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  left: 70%;
  margin: 2rem 0rem;
  width: 300px;
  p {
    padding: 1rem;
    font-size: 1.5rem;
    color: white;
  }
  @media screen and (max-width: 380px) {
    left: 40%;
    width: 150px;
  }
  @media screen and (min-width: 380px) and (max-width: 425px) {
    left: 50%;
    width: 150px;
  }
  @media screen and (min-width: 425px) and (max-width: 650px) {
    left: 50%;
    width: 200px;
  }
  @media screen and (min-width: 650px) and (max-width: 850px) {
    left: 55%;
    width: 250px;
  }
  @media screen and (min-width: 850px) and (max-width: 1150px) {
    left: 60%;
    width: 300px;
  }
`;
const Historical = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);
  background: rgba(19, 28, 39, 0.7);
  border-radius: 5px;
  margin: 2rem 2rem;
  padding: 0.5rem;
`;
const HistoricalData = styled.div`
  margin: 1rem 1rem;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  @media screen and (max-width: 600px) {
    p {
      font-size: 1.2vw;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1050px) {
    p {
      font-size: 1.5vw;
    }
  }
`;

export default HistoryData;
