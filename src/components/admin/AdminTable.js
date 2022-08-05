import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styled from "@emotion/styled"

import { getAllUsers, resetCheckInAll, resetCheckInOne } from "../../api/auth";

const FlexBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">학번</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">전공</TableCell>
              <TableCell align="right">학위</TableCell>
              <TableCell align="right">권한</TableCell>
              <TableCell align="right">체크인 여부</TableCell>
              <TableCell align="right">체크인 초기화</TableCell>
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
                <TableCell align="right">{row.isCheckedIn ? 1 : 0}</TableCell>
                <TableCell align="right">
                  
                  <Button variant="contained"  onClick={() => resetCheckInOne(row.studentId)}>
                    Reset
                  </Button>
                  
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => resetCheckInOne(row.studentId)}>
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FlexBox>
        <Button
          variant="contained"
          onClick={() => resetCheckInAll()}
        >
          모든 체크인 초기화
        </Button>
      </FlexBox>
     
    </div>
  );
}