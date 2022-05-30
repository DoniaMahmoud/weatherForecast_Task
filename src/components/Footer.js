import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-wrapper">
        <h5>Weather Forecast &copy;</h5>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  background: rgba(19, 28, 39, 1);
  color: white;
  .footer-wrapper {
    padding: 2rem;
    width: 90%;
    margin: auto;
    align-items: center;
    min-height: 10vh;
    flex-wrap: wrap;
  }
  h5 {
    /* flex: 1 1 40rem; */
    font-size: 1.2rem;
  }
`;
export default Footer;
