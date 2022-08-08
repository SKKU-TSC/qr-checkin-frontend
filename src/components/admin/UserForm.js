import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NativeSelect from "@mui/material/NativeSelect";
import { addUser, updateUser } from "../../api/auth";
import styled from "@emotion/styled"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SelectLabels from "./UserForm_SelectBox";

const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`

export default function UserForm(props) {
  const [userData, setUserData] = useState({
    studentId: "",
    password: "",
    major: "",
    name: "",
    role: "client",
    degree: "학사",
  });

  const create = () => {
    addUser(
      userData.studentId,
      userData.password,
      userData.major,
      userData.name,
      userData.role,
      userData.degree
    )
      .then(() => alert("성공했습니다."))
      .catch(() => alert("실패했습니다."));
  };

  const update = () => {
    const body = {
      studentId: userData.studentId,
      password: userData.password,
      major: userData.major,
      name: userData.name,
      role: userData.role,
      degree: userData.degree,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { studentId } = useParams();
    updateUser(studentId, body)
      .then(() => alert("성공했습니다."))
      .catch(() => alert("실패했습니다."));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.isUpdating) {
      update();
    } else {
      create();
    }
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
            onChange={(e) =>
              setUserData({ ...userData, studentId: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="비밀번호"
            autoFocus
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            autoFocus
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="major"
            label="학과"
            autoFocus
            onChange={(e) =>
              setUserData({ ...userData, major: e.target.value })
            }
          />
<<<<<<< HEAD
          <NativeSelect required fullWidth id="degree" autoFocus>
            <option
              onClick={() => setUserData({ ...userData, degree: "학사" })}
            >
              학사
            </option>
            <option
              onClick={() => setUserData({ ...userData, degree: "석사" })}
            >
              석사
            </option>
            <option
              onClick={() => setUserData({ ...userData, degree: "박사" })}
            >
              박사
            </option>
            <option
              onClick={() => setUserData({ ...userData, degree: "admin" })}
            >
              admin
            </option>
          </NativeSelect>
          <NativeSelect required fullWidth id="role" autoFocus margin="dense">
            <option
              onClick={() => setUserData({ ...userData, role: "client" })}
            >
              client
            </option>
            <option onClick={() => setUserData({ ...userData, role: "admin" })}>
              admin
            </option>
          </NativeSelect>
=======
          <SelectLabels/>
          <FlexBox>
>>>>>>> 66bfe14e25040603b5431977e973b32c4f7d3467
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