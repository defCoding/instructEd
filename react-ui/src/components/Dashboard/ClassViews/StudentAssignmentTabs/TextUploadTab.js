import React from 'react';
import { TextField, Button, Box, Typography, Grid } from '@material-ui/core';

export default function FileUploadTab(props) {
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
            fullWidth
            className={classes.panelItems}
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={3}
            variant="outlined"
            value={value}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.panelItems} variant="contained" color="secondary" onClick={onSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

