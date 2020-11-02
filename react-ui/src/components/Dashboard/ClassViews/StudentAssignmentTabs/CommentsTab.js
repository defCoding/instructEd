import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';

export default function CommentsTab(props) {
  const classes = props.classes;

  return(
    <Box height={200}>
      <Grid container height="100%" spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Comments</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.panelItems}>Comments from professor on grade here.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

