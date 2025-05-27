import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-top: 28px;
  padding: 22px 30px;
  box-shadow: 0 1px 8px 0 #0001;
`;

const RecRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 38px;
  margin-bottom: 12px;
`;

const IconCircle = styled.div`
  background: #ffed9d;
  color: #ffb200;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.36rem;
  margin-right: 12px;
`;

const Content = styled.div`
  flex: 1;
`;

export default function Recommendations() {
  return (
    <Wrapper>
      <RecRow>
        <IconCircle>👥</IconCircle>
        <Content>
          <b>New Group Trips feature</b>
          <div style={{ fontSize: "0.98rem", color: "#5A6A85", margin: "4px 0" }}>
            This feature helps organize travel for small groups in your organization.
          </div>
          <a href="#">Learn more</a> &nbsp; <a href="#">Check it out</a>
        </Content>
      </RecRow>
      <RecRow>
        <IconCircle>🛡️</IconCircle>
        <Content>
          <b>Travel with confidence</b>
          <div style={{ fontSize: "0.98rem", color: "#5A6A85", margin: "4px 0" }}>
            See the latest travel advisories, restrictions and news updates.
          </div>
          <a href="#">Visit the Egencia® Travel Advisor</a>
        </Content>
      </RecRow>
    </Wrapper>
  );
}