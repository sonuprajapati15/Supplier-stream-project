import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.header`
  background: linear-gradient(90deg, #fff 60%, #f9eedf 110%);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0 40px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 10px 0 0 0;
`;

const MainBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(1)} 0;
`;

const Logo = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.1rem;
    font-weight: 700;
    margin-left: 6px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;

  a {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function Header() {
  return (
    <Wrapper>
      <TopBar>
        <span style={{ marginRight: 16 }}>Help</span>
        <span style={{ marginRight: 16 }}>Feedback</span>
        <span style={{ fontWeight: 600 }}>FlightUX Transformation</span>
        <span style={{ marginLeft: 16, fontWeight: 300 }}>DEMO Egencia Air Demo</span>
        <span style={{ marginLeft: 24 }}>👤</span>
      </TopBar>
      <MainBar>
        <Logo>
          Egencia <span>by Amex GBT</span>
        </Logo>
        <Nav>
          <Link to="/">Book</Link>
          <Link to="/trip">Trips</Link>
          <Link to="/dropdown">Tools</Link>
        </Nav>
        <UserBox>
          Hello, FlightUX
        </UserBox>
      </MainBar>
    </Wrapper>
  );
}