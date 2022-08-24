import styled from "@emotion/styled";
import { useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { verify } from "../api/auth";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ButtonAppBar from "../components/common/ButtonAppBar";
import StickyFooter from "../components/common/StickyFooter";

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
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100%;
  margin: auto;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const StyledImage = styled.img`
  width: 40%;
  height: auto;
  margin: 0;
  padding: 0;
  display: block;

  @media (max-width: 600px) {
    width: 60%;
    margin-bottom: 20px;
  }

  @media (max-width: 400px) {
    width: 60%;
    margin-bottom: 20px;
  }
`;

const TextWrapper = styled(Container)`
  padding: 0;
  margin: 0;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default function PageNotFound() {
  return (
    <MainDiv>
      <ButtonAppBar />
      <InnerDiv>
        <TextWrapper maxWidth="sm">
          <Typography variant="h3" fontWeight={600}>
            이런, 없는 페이지에요 🥲
          </Typography>

          <StyledLink to="/">
            <StyledButton
              variant="contained"
              size="large"
              startIcon={<ArrowBackIcon />}
            >
              되돌아가기
            </StyledButton>
          </StyledLink>
        </TextWrapper>
        <StyledImage src="404.png" alt="SKKU Logo" />
      </InnerDiv>
      <StickyFooter />
    </MainDiv>
  );
}
