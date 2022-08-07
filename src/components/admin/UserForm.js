import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { addUser, updateUser } from "../../api/auth";
import styled from "@emotion/styled"


const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`

export default function UserForm(props) {
  const [isUpdating, setIsUpdating] = useState(props?.isUpdating);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    const options = { content: FormData };
    addUser(
      data.get("studentId"),
      data.get("password"),
      data.get("major"),
      data.get("name"),
      data.get("role"),
      data.get("degree")
    )
      .then(() => alert("성공했습니다."))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <h2>졸업생 추가</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentId"
            label="학번"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="비밀번호"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="major"
            label="학과"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="degree"
            label="학위"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="role"
            label="권한"
            autoFocus
          />
          <FlexBox>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1 }}
          >
            제출하기
          </Button>
          </FlexBox>
        </Box>
      </Container>
    </>
  );
}
