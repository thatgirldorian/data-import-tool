import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '../styles/style.css'

export default function TableGroup() {

    return (
    <FormControl>
        <FormLabel 
        id="demo-controlled-radio-buttons-group"
        sx={{
            fontSize: "14px",
            color: "black"
        }}
        >Filter</FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
                fontSize: "-10px",
            }}
        >
            <FormControlLabel value="audience"  control={<Radio />} label="Audience" />
            <FormControlLabel value="campaign" control={<Radio />} label="Campaigns" />
            <FormControlLabel value="reports" control={<Radio />} label="Reports" />
        </RadioGroup>
    </FormControl>
);
}
