import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { getAllUsers, resetCheckInAll, resetCheckInOne } from "../../api/auth";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginBottom: 10 }}
        onClick={() => resetCheckInAll()}
      >
        모든 체크인 초기화
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="right">학번</TableCell>
              <TableCell align="right">이름</TableCell>
              <TableCell align="right">전공</TableCell>
              <TableCell align="right">학위</TableCell>
              <TableCell align="right">권한</TableCell>
              <TableCell align="right">체크인여부</TableCell>
              <TableCell align="right">체크인초기화</TableCell>
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
                  <button onClick={() => resetCheckInOne(row.studentId)}>
                    Reset
                  </button>
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => resetCheckInOne(row.studentId)}>
                    Update
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
