import { v4 as uuid } from "uuid";
import styled from "styled-components";
import cloud from "../img/cloud.png";

const CurrentCondition = ({ data }) => {
  return (
    <MainContainer>
      <Images>
        <img src={cloud} className="moving-cloud-1 cloud" alt="" />
        <img src={cloud} className="moving-cloud-2 cloud" alt="" />
      </Images>
      {data.request.map((e) => (
        <Center key={uuid()}>
          <p>{e.query}</p>
        </Center>
      ))}
      <Current>
        {data.current_condition.map((e) => (
          <Center key={uuid()}>
            <CurrentData>
              <p>UV Index: {e.uvIndex}</p>
            </CurrentData>
            <CurrentData>
              <p>Humidity: {e.humidity}%</p>
            </CurrentData>
            <CurrentData>
              <p>Visibility: {e.visibility} km</p>
            </CurrentData>
            <CurrentData>
              <p>
                Feels : {e.FeelsLikeC}&deg;C | {e.FeelsLikeF}&deg;F
              </p>
            </CurrentData>
          </Center>
        ))}
      </Current>
      {data.current_condition.map((e) => (
        <Center key={uuid()}>
          <Temp>
            {e.temp_C}&deg;C | {e.temp_F}&deg;F
          </Temp>
          {data.current_condition.map((e) =>
            e.weatherDesc.map((el) => <p key={uuid()}>Mostly {el.value}</p>)
          )}
        </Center>
      ))}

      <StyledTemp>
        <p>
          L: {data.weather[0].mintempC}&deg;C | {data.weather[0].mintempF}
          &deg;F
        </p>
        <p>
          H: {data.weather[0].maxtempC}&deg;C | {data.weather[0].maxtempF}
          &deg;F
        </p>
      </StyledTemp>
      <Hourly>
        <h4>HOURLY FORECAST</h4>
        <HourlyCondition>
          {data.weather[0].hourly.map((e) => (
            <div key={uuid()}>
              <Center>
                <p>{e.time}</p>
              </Center>
              {e.weatherIconUrl.map((e) => (
                <Center key={uuid()}>
                  <img src={e.value} alt="" />
                </Center>
              ))}
              <p>
                {e.tempC}&deg;C | {e.tempF}&deg;F
              </p>
            </div>
          ))}
        </HourlyCondition>
      </Hourly>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 100vh;
  padding-top: 5rem;
  position: relative;
  overflow: hidden;

  p {
    font-size: 1.5rem;
  }
`;
const Images = styled.div`
  .cloud {
    position: absolute;
    top: 0%;
    right: 0%;
  }
  img {
    width: 60%;
  }
  .moving-cloud-1 {
    animation: cloudAnimation 3s infinite alternate ease-in-out;
    z-index: 20;
  }
  .moving-cloud-2 {
    top: 20%;
    z-index: -1;
    opacity: 1;
    animation: cloudAnimation 4s infinite alternate ease-in-out;
  }
  @keyframes cloudAnimation {
    from {
      transform: translate(10%, -10%);
    }
    to {
      transform: translate(0%, 0%);
    }
  }
  @media screen and (max-width: 950px) {
    .cloud {
      height: 30rem;
      pointer-events: none;
    }
  }
  @media screen and (min-width: 950px) and(max-width: 2400px) {
    .cloud {
      height: 40rem;
      pointer-events: none;
    }

    .moving-cloud-1 {
      z-index: 15;
    }
    .moving-cloud-2 {
      z-index: -1;
    }
  }
`;
const StyledTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  p {
    margin: 2rem 2rem 1rem 2rem;
  }
  @media screen and (max-width: 820px) {
    flex-direction: column;
    text-align: center;
    margin-top: 2rem;

    p {
      margin: 0.5rem;
    }
  }
`;
const Center = styled.div`
  text-align: center;
  align-items: center;
`;
const Temp = styled.div`
  font-size: 5rem;
  margin: 2rem;
  z-index: 100;
  @media screen and (max-width: 550px) {
    font-size: 6vw;
    font-weight: 600;
  }
  @media screen and (min-width: 550px) and (max-width: 1115px) {
    font-size: 4vw;
    font-weight: 600;
  }
`;
const Current = styled.div`
  position: absolute;
  top: 1%;
  margin: 2rem;
  justify-content: space-between;
  background: rgba(19, 28, 39, 0.7);
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);
  color: white;
  border-radius: 5px;
  padding: 1.5rem;
  width: 25%;
  height: 25rem;
  h4 {
    margin: 0rem 1.5rem;
  }
  @media screen and (max-width: 374px) {
    display: none;
  }
  @media screen and (max-width: 650px) {
    height: 21rem;
  }
  @media screen and (min-width: 650px) and (max-width: 1115px) {
    height: 23.5rem;
  }
`;
const CurrentData = styled.div`
  margin: 1.5rem 0.5rem;
  justify-content: space-between;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  padding: 1rem;
  height: 4rem;
  @media screen and (max-width: 650px) {
    p {
      font-size: 1.5vw;
    }
    padding: 0.9rem;
    height: 3rem;
  }
  @media screen and (min-width: 650px) and (max-width: 1115px) {
    p {
      font-size: 1.5vw;
    }
    height: 4rem;
    padding: 1.2rem;
    margin: 1.2rem 0rem;
  }
`;
const Hourly = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);
  margin: 6rem 2rem 2rem 2rem;
  justify-content: space-between;
  background: rgba(19, 28, 39, 0.7);
  color: white;
  border-radius: 5px;
  padding: 1.5rem;
  h4 {
    margin: 0rem 1.5rem;
    font-size: 1rem;
  }
  @media screen and (max-width: 650px) {
    padding: 0.7rem;
    h4 {
      margin: 0.3rem 1rem;
      font-size: 1.5vw;
    }
  }
`;
const HourlyCondition = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 1rem;
  justify-content: space-between;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  padding: 1.5rem;
  img {
    margin: 0.5rem 0rem;
  }

  @media screen and (max-width: 600px) {
    padding: 0.5rem;
    p {
      font-size: 1.2vw;
    }
    img {
      width: 4vw;
      object-fit: cover;
    }
  }
  @media screen and (min-width: 600px) and (max-width: 1050px) {
    p {
      font-size: 1.5vw;
    }
    img {
      width: 5vw;
      object-fit: cover;
    }
  }
`;

export default CurrentCondition;
