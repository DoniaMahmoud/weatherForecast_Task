import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Nav = () => {
  return (
    <StyledNav>
      <Link id="logo" to="/">
        Weather Forecast
      </Link>
    </StyledNav>
  );
};
const StyledNav = styled.nav`
  min-height: 9vh;
  display: flex;
  justify-content: space-between;
  margin: auto;
  align-items: center;
  padding: 1rem 8rem;
  background: rgba(19, 28, 39, 1);
  position: sticky;
  top: 0;
  z-index: 40;
  a {
    color: white;
    text-decoration: none;
  }

  #logo {
    font-size: 2rem;
    font-family: "Lobster", cursive;
    font-weight: lighter;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    #logo {
      display: inline-block;
      margin: 1rem;
    }
  }
`;

const Line = styled(motion.div)`
  height: 0.3rem;
  background: #23d997;
  width: 0%;
  position: absolute;
  bottom: -80%;
  left: 60%;
  @media (max-width: 1300px) {
    left: 0%;
  }
`;

export default Nav;
