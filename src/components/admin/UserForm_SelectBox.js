import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';



const FlexBox2 = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function SelectLabels() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>    
      
      <FlexBox2>
      <FormControl sx={{ mt: 2, minWidth: 190 }}>
        <InputLabel 
        id="demo-simple-select-helper-label"
        required
        >
        학위
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        > 
        <MenuItem value={10}>학사</MenuItem>
        <MenuItem value={20}>석사</MenuItem>
        <MenuItem value={30}>박사</MenuItem>
        <MenuItem value={30}>admin</MenuItem>
        </Select>  
      </FormControl>
      
      <FormControl sx={{ mt: 2, minWidth: 190 }}>
        <InputLabel 
        id="demo-simple-select-helper-label" 
        required>
        권한
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
        <MenuItem value={10}>Client</MenuItem>
        <MenuItem value={20}>Admin</MenuItem>
          
        </Select>  
      </FormControl>
      </FlexBox2>
      
    </div>
    
  );
}