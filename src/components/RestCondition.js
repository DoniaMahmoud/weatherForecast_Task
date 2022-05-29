import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { lineAnimation } from "../Animation";
import { motion } from "framer-motion";
const RestCondition = ({ data }) => {
  return (
    <Rest>
      <h4>10-DAY FORECAST</h4>
      {data.weather.map((e) => (
        <StyledRest key={uuid()}>
          <RestData>
            <p>{e.date}</p>
            <Spacing>
              {e.mintempC}&deg;C | {e.mintempF}&deg;F
            </Spacing>
            <motion.div
              initial="hidden"
              animate="show"
              variants={lineAnimation}
              className="line"
            ></motion.div>
            <p>
              {e.maxtempC}&deg;C | {e.maxtempF}&deg;F
            </p>
          </RestData>
        </StyledRest>
      ))}

      {/* {data.weather.map((e) =>
        e.hourly.map((el) => <p> {el.weatherDesc[0].value}</p>)
      )} */}
      {/* {data.weather.map((e) =>
        [...e.hourly(10)].map((el, i) => (
          <div key={i}>{el.weatherDesc[0].value}</div>
        ))
      )} */}
    </Rest>
  );
};
const StyledRest = styled.div`
  margin: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
`;
const Rest = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);

  margin: 1rem 2rem;
  justify-content: space-between;
  background: rgba(19, 28, 39, 0.7);
  color: white;
  border-radius: 5px;
  padding: 1.5rem;
  /* width: 25%;
  height: 25rem; */
  h4 {
    margin: 0rem 1.5rem;
    font-size: 1rem;
  }
`;
const RestData = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  p {
    margin: 0rem 2rem;
  }
  .line {
    height: 0.5rem;
    background: linear-gradient(to right, #3131d1b8, #ffa600c0, #ff0000c7);
  }
`;

const Spacing = styled.div`
  margin: 0rem 2rem 0rem 40rem;
`;
export default RestCondition;
