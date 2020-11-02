import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

export default function GradeTab(props) {
  const classes = props.classes;

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Grade</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.panelItems}>grade here</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

