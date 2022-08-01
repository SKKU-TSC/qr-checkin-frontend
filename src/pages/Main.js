import styled from "@emotion/styled";
import { Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

import ButtonAppBar from "../components/common/ButtonAppBar";
import StickyFooter from "../components/common/StickyFooter";
import { login, logout } from "../api/auth";

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

export default function Main() {
  return (
    <MainDiv>
      <ButtonAppBar />
      <InnerDiv>
        <TextWrapper maxWidth="sm">
          <Typography variant="h3" fontWeight={600}>
            QR로 간단하게!
          </Typography>
          <Typography variant="h5" fontWeight={500} marginTop={1}>
            이제 체크인은 QR로 간단하게 해보세요!
          </Typography>

          <StyledLink to="/login">
            <StyledButton
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
            >
              로그인
            </StyledButton>
          </StyledLink>
        </TextWrapper>
        <StyledImage src="logo.png" alt="SKKU Logo" />
      </InnerDiv>
      <StickyFooter />
    </MainDiv>
  );
}
