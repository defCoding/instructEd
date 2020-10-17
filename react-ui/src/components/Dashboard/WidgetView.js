import React from 'react';
import WidgetCase from './WidgetCase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function WidgetView() {
  const classes = useStyles();
  return(
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container height="100%" spacing={1}>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
        <Grid item xs={6}>
          <WidgetCase />
        </Grid>
      </Grid>
    </main>
  );
}