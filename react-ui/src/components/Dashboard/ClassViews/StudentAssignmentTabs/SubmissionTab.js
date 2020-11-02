import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

export default function SubmissionTab(props) {
  const classes = props.classes;

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Submission</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Uploaded files or text submission</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

