import { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";

import styled from "@emotion/styled";

import ButtonAppBar from "../components/common/ButtonAppBar";
import StickyFooter from "../components/common/StickyFooter";
import UserCard from "../components/user/UserCard";

const MainDiv = styled(Container)`
  margin: 0 !important;
  padding: 0 !important;
  max-width: none !important;
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`;

const InnerDiv = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  margin: auto;
`;

export default function User({ userState, setUserState }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(userState);
    setLoading(false);
  }, [userState]);

  return (
    <MainDiv>
      <ButtonAppBar userState={userState} setUserState={setUserState} />

      <InnerDiv>
        {loading ? (
          <CircularProgress />
        ) : (
          <UserCard userState={user} setUserState={setUserState} />
        )}
      </InnerDiv>
      <StickyFooter />
    </MainDiv>
  );
}
