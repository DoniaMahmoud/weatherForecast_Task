import styled from "styled-components";
import { SpinnerCircularSplit } from "spinners-react";
const LoadingSpinner = () => {
  return (
    <Spinner>
      <SpinnerCircularSplit
        size={70}
        thickness={100}
        speed={100}
        color="#ffffff"
        secondaryColor="#b8b0b0"
      />
    </Spinner>
  );
};

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default LoadingSpinner;
