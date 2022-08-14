import * as React from "react";
import { useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/user";
import { login, verify } from "../api/auth";
import ButtonAppBar from "../components/common/ButtonAppBar";

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  margin: 0;
  padding: 0;
  display: block;
`;

const StyledButton = styled(Button)`
  border-radius: 8px;
`;

export default function SignIn() {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(UserContext);

  //이미 로그인되어있다면 redirect시킴
  const verifyUser = () => {
    verify().then(({ data: { data } }) => {
      if (data.role === "admin") {
        navigate("/admin");
        setUserState("admin");
      } //admin 유저일 경우
      else {
        navigate("/user");
        setUserState("client");
      } //일반 유저일 경우
    });
  };

  //로그인 제출시
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("studentId"), data.get("password"))
      .then(() => {
        verifyUser();
      })
      .catch((error) => {
        verifyUser();
        alert("로그인에 실패했습니다.");
      });
  };

  //이미 로그인 되었다면
  React.useEffect(() => verifyUser(), []);

  return (
    <>
      <ButtonAppBar />

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledImage src="school_logo.png" />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="studentId"
              label="학번"
              name="studentId"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{ mt: 3, mb: 2, py: 1 }}
            >
              로그인
            </StyledButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  로그인이 안되나요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
