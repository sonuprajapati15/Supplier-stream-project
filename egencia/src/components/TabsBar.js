import React from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 18px;
  padding: 0 24px 0 24px;
`;

const Tab = styled.div`
  padding: 18px 38px 12px 0;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.textSecondary};
  border-bottom: ${({ active, theme }) =>
    active ? `2.5px solid ${theme.colors.primary}` : "none"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.07rem;
`;

export default function TabsBar() {
  return (
    <TabsWrapper>
      <Tab active>
        <span>✈️</span> Flights
      </Tab>
      <Tab>
        <span>🏨</span> Hotels
      </Tab>
      <Tab>
        <span>🚆</span> Trains
      </Tab>
      <Tab>
        <span>🚗</span> Cars
      </Tab>
    </TabsWrapper>
  );
}