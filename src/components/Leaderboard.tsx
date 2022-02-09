import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";
import Box from "./Box";
import Loading from "./Loading";
import {
  faCaretUp,
  faCaretDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import apiCalls from "../services/api-calls";

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

interface RankHist {
  user: { id: number; username: string };
  totalPoints: number;
  rank: number;
  change: number;
}
interface RanksData {
  id: number;
  createdAt: string;
  rankHists: RankHist[];
}
declare type Dir = "up" | "down" | "none";

const Leaderboard: React.FC<{
  setSelectedUserId: (userId: number) => void;
  selectedUserId: number | null;
}> = ({ setSelectedUserId, selectedUserId }) => {
  const [data, setData] = useState<RanksData>();
  const [isLoading, setIsLoading] = useState(false);
  const fetchRanks = useCallback(async () => {
    setIsLoading(true);
    const resData = await apiCalls.getLatestRanks();
    setData(resData);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchRanks();
  }, []);
  const renderDataList = useCallback(() => {
    return (
      <SListWrapper>
        {data?.rankHists?.map((rh, i) => {
          let cn = i === 0 ? "top" : undefined;
          let dir: Dir = rh.change > 0 ? "up" : rh.change < 0 ? "down" : "none";
          return (
            <SList
              key={`${rh.user.id}-${rh.rank}`}
              className={`${cn} clickable ${
                selectedUserId === rh.user.id ? "selected" : ""
              }`}
              onClick={() => {
                console.log(rh.user.id);
                setSelectedUserId(rh.user.id);
              }}
            >
              <SRankNum>{rh.rank}</SRankNum>
              <Direction dir={dir} />
              <SName>{rh.user.username}</SName>
              <SPoints>{rh.totalPoints}</SPoints>
            </SList>
          );
        })}
      </SListWrapper>
    );
  }, [data, selectedUserId]);
  return (
    <Box>
      <STitle>Rankings</STitle>
      {isLoading ? (
        <LoadingWrapper>
          <Loading></Loading>
        </LoadingWrapper>
      ) : (
        renderDataList()
      )}
    </Box>
  );
};
const SListWrapper = styled.div``;
const LoadingWrapper = styled.div`
  display: grid;
  place-items: center;
  flex: 1;
`;
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
  &:hover {
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  &.selected {
    background: rgba(66, 39, 90, 0.4);
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
