import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components/macro";
import Box from "./Box";
import {
  faCaretUp,
  faCaretDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  up: faCaretUp,
  down: faCaretDown,
  none: faMinus,
};

const Direction: React.FC<{ dir: "up" | "down" | "none" }> = ({ dir }) => {
  return <SFontAwesomeIcon icon={iconMap[dir]} className={dir} />;
};
const SFontAwesomeIcon = styled(FontAwesomeIcon).attrs((props) => ({
  className: props.className,
}))`
  font-size: 2rem;
  &.up {
    color: #42b059;
  }
  &.down {
    color: #dd3e54;
  }
  &.none {
    width: 1.2rem;
  }
  color: rgb(69 41 91 / 90%);
  margin-right: 0.5rem;
`;
const Leaderboard = () => (
  <Box>
    <STitle>Rankings</STitle>
    <SList className="top">
      <SRankNum>1</SRankNum>
      <Direction dir="up" />
      <SName>test</SName>
      <SPoints>10</SPoints>
    </SList>
    <SList>
      <SRankNum>2</SRankNum>
      <Direction dir="down" />
      <SName>test</SName>
      <SPoints>5</SPoints>
    </SList>
    <SList>
      <SRankNum>3</SRankNum>
      <Direction dir="none" />
      <SName>test</SName>
      <SPoints>4</SPoints>
    </SList>
  </Box>
);
const STitle = styled.div`
  font-size: 1.5rem;
  padding: 0 0.5rem;
`;
const SName = styled.div`
  flex: 1;
`;
const SRankNum = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;
const SPoints = styled.div`
  font-size: 13px;
  margin: 0 1rem;
  padding-left: 1rem;
  border-left: solid 1px rgba(64, 64, 64, 0.5);
`;
const SList = styled.div.attrs((props) => ({ className: props.className }))`
  &.top {
    margin-top: 0.5rem;
    & > ${SRankNum} {
      font-size: 3rem;
    }
    & > ${SFontAwesomeIcon} {
      font-size: 2.5rem;
    }
  }
  background: rgba(66, 39, 90, 0.2);
  margin-top: 1rem;
  border-radius: 3rem;
  padding: 0.5rem 1.5rem;
  color: #000000;
  display: flex;
  align-items: center;
  column-gap: 1rem;
`;
export default Leaderboard;
