import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  margin-top: 60px;
  background: #fff;
  padding: 32px 0 12px 0;
  text-align: center;
  color: #465366;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #153775;
  margin-bottom: 10px;
  letter-spacing: -2px;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 36px;
  margin: 24px 0 18px 0;
  flex-wrap: wrap;
  a {
    color: #465366;
    font-size: 1.22rem;
    text-decoration: none;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Disclaimer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  font-size: 1.22rem;
  color: #465366;
  font-weight: 400;
  margin-bottom: 18px;
`;

const SubLogo = styled.div`
  margin: 18px 0 8px 0;
  img {
    height: 44px;
  }
`;

const Copyright = styled.div`
  color: #465366;
  font-size: 1.14rem;
  margin-top: 12px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Logo>
        <span style={{ fontSize: "1.1rem", fontWeight: 400, letterSpacing: 0, color: "#0057B8" }}>AMEX GBT</span>
        <br />
        Egencia
        <span style={{ color: "#f5b800", fontSize: "1.3rem", fontWeight: 700, marginLeft: 5 }}>⟶</span>
      </Logo>
      <NavLinks>
        <a href="#">Egencia.com</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie policy</a>
        <a href="#">Egencia promise</a>
        <a href="#">Egencia LLC Terms of use</a>
        <a href="#">Mobile app</a>
        <a href="#">Customer support</a>
      </NavLinks>
      <Disclaimer>
        GBT Travel Services UK Limited (GBT UK) and its authorized sublicensees (including Ovation Travel Group and Egencia) use certain trademarks and service marks of American Express Company or its subsidiaries (American Express) in the “American Express Global Business Travel” and “American Express GBT Meetings & Events” brands and in connection with its business for permitted uses only under a limited license from American Express (Licensed Marks). The Licensed Marks are trademarks or service marks of, and the property of, American Express. GBT UK is a subsidiary of Global Business Travel Group, Inc. (NYSE: GBTG). American Express holds a minority interest in GBTG, which operates as a separate company from American Express.
      </Disclaimer>
      <SubLogo>
        <img src="https://www.amexglobalbusinesstravel.com/content/uploads/2022/03/GBT-Logo-EN.png" alt="Global Business Travel" />
      </SubLogo>
      <Copyright>
        © 2025 GBT Travel Services UK Limited
      </Copyright>
    </FooterWrapper>
  );
}