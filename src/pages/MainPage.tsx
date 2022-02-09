import React from "react";
import styled from "styled-components/macro";
import Leaderboard from "../components/Leaderboard";
import Map from "../components/Map";
const MainPage = () => (
  <Page>
    <Header>
      <SLogo src={process.env.PUBLIC_URL + "/logo192.png"} />
      CSFS Board
    </Header>
    <Body>
      <Leaderboard />
      <Map></Map>
    </Body>
  </Page>
);

const SLogo = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 2rem;
`;
const Header = styled.div`
  font-size: 4rem;
  padding: 2rem;
  font-weight: bold;
  color: #e4e4e4;
  display: flex;
`;

const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Body = styled.div`
  flex: 1;
  margin-bottom: 4rem;
  display: grid;
  grid-template-columns: 4fr 6fr;
  column-gap: 2rem;
  & > * {
  }
  width: 80%;
  max-height: 70%;
`;
export default MainPage;
