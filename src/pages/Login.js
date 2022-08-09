import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import LoginIcon from "@mui/icons-material/Login";
import { login, verify } from "../api/auth";
import ButtonAppBar from "../components/common/ButtonAppBar";
import { useNavigate } from "react-router-dom";

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

export default function SignIn({ userState, setUserState }) {
  const navigate = useNavigate();

  //이미 로그인되어있다면 redirect시킴
  const verifyUser = () => {
    if (userState) {
      if (userState.role === "admin") navigate("/admin");
      else navigate("/");
    }
  };

  const handleLogin = async () => {
    await verify().then(({ data: { data } }) => {
      setUserState(data);
    });
    verifyUser();
  };

  //로그인 제출시
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(data.get("studentId"), data.get("password"))
      .then(() => {
        alert("로그인 성공!!");
        handleLogin();
      })
      .catch((error) => {
        verifyUser();
        alert("로그인에 실패했습니다.");
      });
  };

  //이미 로그인 되었다면
  React.useEffect(() => verifyUser(), [userState]);

  return (
    <>
      <ButtonAppBar userState={setUserState} setUserState={setUserState} />

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
