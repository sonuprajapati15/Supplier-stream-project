import React, { useState } from "react";
import styled from "styled-components";
import TabsBar from "../components/TabsBar";
import FlightSearch from "../components/FlightSearch";
import UpcomingTrips from "../components/UpcomingTrips";
import FavoriteLinks from "../components/FavoriteLinks";
import Recommendations from "../components/Recommendations";

const Container = styled.div`
  max-width: 1080px;
  margin: 30px auto;
  padding: 0 12px 48px 12px;
`;

export default function HomePage() {
  const [fetching, setFetching] = useState(false);

  function handleSearch() {
    setFetching(true);
    setTimeout(() => {
      alert("Fetching all bookings... (mock)");
      setFetching(false);
    }, 1200);
  }

  return (
    <Container>
      <TabsBar />
      <FlightSearch onSearch={handleSearch} loading={fetching} />
      <div style={{ display: "flex", gap: 32, marginTop: 32 }}>
        <UpcomingTrips />
        <FavoriteLinks />
      </div>
      <Recommendations />
    </Container>
  );
}