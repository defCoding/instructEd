import React from 'react';
import WidgetCase from './WidgetCase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import LightBackground from './assets/background.jpg';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    backgroundImage: 'url(' + LightBackground + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default function WidgetView(props) {
  const classes = useStyles();
  const currentWidgets = props.displayWidgets;
  
  return(
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container height="100%" spacing={1}>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={currentWidgets} widgetPosn={0}/>
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={currentWidgets} widgetPosn={1}/>
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={currentWidgets} widgetPosn={2}/>
        </Grid>
        <Grid item sm={12} md={6} maxHeight={300}>
          <WidgetCase displayWidgets={currentWidgets} widgetPosn={3}/>
        </Grid>
      </Grid>
    </main>
  );
}