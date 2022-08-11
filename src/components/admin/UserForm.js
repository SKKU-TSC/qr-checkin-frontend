import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { addUser, updateUser, getOneUser } from "../../api/users";
import styled from "@emotion/styled";
import SelectLabels from "./UserForm_SelectBox";

const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;

export default function UserForm() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    studentId: "",
    password: "",
    major: "",
    name: "",
    role: "client",
    degree: "학사",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsUpdating(true);
      getOneUser(id).then((user) =>
        setUserData({
          studentId: user.studentId,
          password: user.password,
          major: user.major,
          name: user.name,
          role: user.role,
          degree: user.degree,
        })
      );
    }
  }, []);

  const create = () => {
    addUser(
      userData.studentId,
      userData.password,
      userData.major,
      userData.name,
      userData.role,
      userData.degree
    )
      .then(() => {
        alert("성공했습니다.");
        navigate("/admin/usertable");
      })
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
    updateUser(id, body)
      .then(() => {
        alert("성공했습니다.");
        navigate("/admin/usertable");
      })
      .catch(() => alert("실패했습니다."));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdating) update();
    else create();
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <h2>{isUpdating ? "졸업생 수정" : "졸업생 추가"}</h2>
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentId"
            label="학번"
            autoFocus
            value={userData.studentId}
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
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="major"
            label="학과"
            autoFocus
            value={userData.major}
            onChange={(e) =>
              setUserData({ ...userData, major: e.target.value })
            }
          />
          <SelectLabels userData={userData} setUserData={setUserData} />
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
