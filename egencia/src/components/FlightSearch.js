import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 24px 24px 18px 24px;
  box-shadow: 0 1px 8px 0 #0001;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  background: #f3f6fa;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 7px;
  padding: 11px 14px;
  min-width: 180px;
  font-size: 1rem;
`;

const Dropdown = styled.select`
  background: #f3f6fa;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 7px;
  padding: 11px 14px;
  min-width: 110px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 12px 32px;
  font-weight: 600;
  font-size: 1.04rem;
  cursor: pointer;
  margin-left: 16px;
  box-shadow: 0 1px 4px #0001;
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default function FlightSearch({ onSearch, loading }) {
  return (
    <Wrapper>
      <Row>
        <Dropdown>
          <option>One way</option>
          <option>Round trip</option>
        </Dropdown>
        <Dropdown>
          <option>Economy</option>
          <option>Business</option>
        </Dropdown>
      </Row>
      <Row>
        <Input defaultValue="Delhi, India (DEL-Indira Gandhi...)" />
        <span>→</span>
        <Input defaultValue="Paris, France (PAR-All Airport)" />
        <Input type="date" style={{ width: 140 }} />
        <Dropdown>
          <option>Anytime</option>
          <option>Morning</option>
          <option>Afternoon</option>
        </Dropdown>
        <span style={{ flex: 1, textAlign: "right" }}>
          <a href="#" style={{ fontWeight: 500, color: "#0057B8" }}>
            My travel info
          </a>
        </span>
        <SearchButton disabled={loading} onClick={onSearch}>
          {loading ? "Fetching..." : "Search flights"}
        </SearchButton>
      </Row>
    </Wrapper>
  );
}