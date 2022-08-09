import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";

const FlexBox2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function SelectLabels({ userData, setUserData }) {
  return (
    <div>
      <FlexBox2>
        <FormControl sx={{ mt: 2, minWidth: 190 }}>
          <InputLabel id="demo-simple-select-helper-label" required>
            학위
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={userData.degree}
            label="학위"
            onChange={(e) =>
              setUserData({ ...userData, degree: e.target.value })
            }
          >
            <MenuItem value={"학사"}>학사</MenuItem>
            <MenuItem value={"석사"}>석사</MenuItem>
            <MenuItem value={"박사"}>박사</MenuItem>
            <MenuItem value={"admin"}>admin</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 2, minWidth: 190 }}>
          <InputLabel id="demo-simple-select-helper-label" required>
            권한
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={userData.role}
            label="role"
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
          >
            <MenuItem value={"client"}>Client</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>
      </FlexBox2>
    </div>
  );
}
