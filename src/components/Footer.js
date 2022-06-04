import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer">
        <h5>Weather Forecast &copy;</h5>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  background: rgba(19, 28, 39, 1);
  color: white;
  .footer {
    padding: 2rem;
    width: 90%;
    margin: auto;
    min-height: 10vh;
  }
  h5 {
    font-size: 1.2rem;
  }
`;
export default Footer;
