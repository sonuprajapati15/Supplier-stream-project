import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  flex: 2;
  padding: 26px 20px;
  min-width: 350px;
`;

const TripsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const TripCard = styled.div`
  background: #f6f8fa;
  border-radius: 8px;
  box-shadow: 0 1px 6px #0001;
  width: 180px;
  padding: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    width: 100%;
    height: 88px;
    object-fit: cover;
  }
`;

const TripInfo = styled.div`
  padding: 10px 12px;
  width: 100%;
`;

const AddBtn = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  background: #fff;
  color: ${({ theme }) => theme.colors.blue};
  border-radius: 6px;
  padding: 7px 16px;
  margin-top: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.97rem;
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: #fff;
  }
`;

export default function UpcomingTrips() {
  return (
    <Wrapper>
      <h3 style={{ margin: 0, marginBottom: 12, fontWeight: 600, fontSize: "1.08rem" }}>Upcoming trips</h3>
      <TripsContainer>
        <TripCard>
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=cover&w=400&q=80" alt="Portland" />
          <TripInfo>
            <div style={{ fontWeight: 600 }}>Portland</div>
            <div style={{ color: "#5A6A85", fontSize: "0.97rem" }}>Fri, May 30, 2025</div>
            <AddBtn>+ Add to trip</AddBtn>
          </TripInfo>
        </TripCard>
        <TripCard>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=cover&w=400&q=80" alt="Mexico City" />
          <TripInfo>
            <div style={{ fontWeight: 600 }}>Mexico City</div>
            <div style={{ color: "#5A6A85", fontSize: "0.97rem" }}>Wed, Sep 10, 2025</div>
            <AddBtn>+ Add to trip</AddBtn>
          </TripInfo>
        </TripCard>
      </TripsContainer>
    </Wrapper>
  );
}