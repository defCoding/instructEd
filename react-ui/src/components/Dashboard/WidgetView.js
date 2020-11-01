import React from 'react';
import WidgetCase from './WidgetCase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function WidgetView(props) {
  const classes = useStyles();
  const displayWidgets = props.displayWidgets;

  return(
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container height="100%" spacing={1}>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={displayWidgets} />
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={displayWidgets} />
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={displayWidgets} />
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={displayWidgets} />
        </Grid>
      </Grid>
    </main>
  );
}