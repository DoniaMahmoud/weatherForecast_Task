import { v4 as uuid } from "uuid";
import styled from "styled-components";
import { lineAnimation } from "../Animation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

const RestCondition = ({ data }) => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: 0.3 });
  if (view) {
    controls.start("show");
  } else {
    controls.start("hidden");
  }
  return (
    <Rest ref={element}>
      <h4>10-DAY FORECAST</h4>
      {data.weather.map((e) => (
        <StyledRest key={uuid()}>
          <RestData>
            <p>{e.date}</p>
            <Spacing>
              <p>
                {e.mintempC}&deg;C | {e.mintempF}&deg;F
              </p>
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
    </Rest>
  );
};
const Rest = styled.div`
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.3);
  margin: 1rem 2rem;
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
      margin: 0.3rem 1.5rem;
      font-size: 1.5vw;
    }
  }
`;
const StyledRest = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 1.5rem;
  justify-content: space-between;
  p {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 800px) {
    p {
      font-size: 1.5vw;
      white-space: nowrap;
    }
  }
  @media screen and (min-width: 800px) and (max-width: 1430px) {
    p {
      font-size: 1vw;
      white-space: nowrap;
    }
  }
`;

const RestData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(19, 28, 39, 0.3);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  p {
    margin: 0rem 1rem;
  }
  .line {
    height: 0.5rem;
    background: linear-gradient(to right, #3131d1b8, #ffa600c0, #ff0000c7);
  }
  @media screen and (max-width: 380px) {
    p {
      margin: 0rem 0.2rem;
    }
  }
  @media screen and (min-width: 380px) and (max-width: 500px) {
    p {
      margin: 0rem 0.5rem;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 800px) {
    p {
      margin: 0rem 0.7rem;
    }
  }
  @media screen and (min-width: 800px) and (max-width: 1050px) {
    padding: 0.9rem;
    p {
      margin: 0rem 1rem;
    }
  }
`;

const Spacing = styled.div`
  margin: 0rem 0rem 0rem 40rem;
  @media screen and (max-width: 380px) {
    margin: 0rem 0rem 0rem 3rem;
  }
  @media screen and (min-width: 380px) and (max-width: 500px) {
    margin: 0rem 0.3rem 0rem 5rem;
  }
  @media screen and (min-width: 500px) and (max-width: 800px) {
    margin: 0rem 0.5rem 0rem 10rem;
  }
  @media screen and (min-width: 800px) and (max-width: 1050px) {
    margin: 0rem 1rem 0rem 23rem;
  }
  @media screen and (min-width: 1050px) and (max-width: 1300px) {
    margin: 0rem 2rem 0rem 30rem;
  }
`;
export default RestCondition;
