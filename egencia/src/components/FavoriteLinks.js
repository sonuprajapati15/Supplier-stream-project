import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius};
  flex: 1;
  padding: 20px;
  min-width: 220px;
  margin-left: 6px;
  height: fit-content;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.blue};
  li {
    margin-bottom: 10px;
    font-size: 0.98rem;
  }
`;

export default function FavoriteLinks() {
  return (
    <Wrapper>
      <h4 style={{ margin: 0, marginBottom: 6, fontWeight: 600, fontSize: "1.04rem" }}>Favorite links</h4>
      <LinkList>
        <li><a href="#">Product Info Site</a></li>
        <li><a href="#">Flight Price Guarantee</a></li>
        <li><a href="#">Mobile App</a></li>
        <li style={{ color: "#a7adc6" }}><a href="#" style={{ color: "#a7adc6" }}>Egencia News</a></li>
        <li style={{ marginTop: 8 }}><a href="#">Show more</a></li>
      </LinkList>
    </Wrapper>
  );
}