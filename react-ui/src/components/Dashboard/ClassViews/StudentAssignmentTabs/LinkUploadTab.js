import React from 'react';
import { TextField, Button, Box, Typography, Grid } from '@material-ui/core';

export default function LinkUploadTab(props) {
  const classes = props.classes;
  const [value, setValue] = React.useState("");

  const handleChange = e => {
    setValue(e.target.value);
  }

  const onSubmit = e => {
    alert(value);
  };

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <TextField 
            value={value}
            onChange={handleChange}
            id="outlined-basic" 
            label="Link" 
            variant="outlined" 
            className={classes.panelItems}/>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" className={classes.panelItems} onClick={onSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

