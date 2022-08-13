import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

import { getAllUsers } from "../../api/users";

const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fillTable = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  useEffect(() => fillTable(), []);

  return (
    <div>
      <FlexBox>
        <Button variant="contained" onClick={() => navigate("/admin/userform")}>
          새로운 유저 생성
        </Button>
      </FlexBox>
      <hr style={{ marginBottom: "20px" }} />
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">학번</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">전공</TableCell>
              <TableCell align="right">학위</TableCell>
              <TableCell align="right">권한</TableCell>
              <TableCell align="right">코멘트</TableCell>
              <TableCell align="right">수정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.studentId}>
                <TableCell align="right">{row.studentId}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.major}</TableCell>
                <TableCell align="right">{row.degree}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/admin/userform/${row.studentId}`)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
