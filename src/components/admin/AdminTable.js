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
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";

import { getAllUsers } from "../../api/users";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [searching, setSearching] = useState("");
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;
  const navigate = useNavigate();

  const search = () => {
    getAllUsers().then((users) =>
      setUsers(
        users.filter(
          (user) =>
            user.name.indexOf(searching) > -1 ||
            String(user.studentId).indexOf(searching) > -1
        )
      )
    );
  };

  const fillTable = () => {
    getAllUsers().then((users) => setUsers(users));
  };

  useEffect(() => fillTable(), []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 5 }} />
        <TextField
          style={{ flex: 3.5, marginBottom: 2 }}
          fullWidth
          id="search"
          label="검색하기"
          placeholder="학번 또는 이름으로 검색하세요."
          autoFocus
          value={searching}
          onChange={(e) => {
            e.preventDefault();
            setSearching(e.target.value);
          }}
        />
        <SearchIcon
          onClick={() => search()}
          style={{ flex: 0.5, width: "50px", height: "50px" }}
        />
      </div>
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
            {users.slice(offset, offset + 10).map((row) => (
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Pagination
          count={parseInt(users.length / 10) + 1}
          color="success"
          onChange={(e) => setPage(parseInt(e.target.textContent))}
        />
        <Button
          style={{ flex: 1, marginTop: 10 }}
          variant="contained"
          onClick={() => navigate("/admin/userform")}
          sx={{ marginBottom: 2 }}
        >
          새로운 유저 생성
        </Button>
      </div>
    </>
  );
}
