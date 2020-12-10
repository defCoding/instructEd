import React from 'react';
import WidgetCase from './WidgetCase';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import LightBackground from './assets/light.jpg';
import DarkBackground from './assets/dark.png';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default function WidgetView({currentRoleWidgets, darkState, removeWidgetClick, openWidgets, updateWidgetClick}) {
  const classes = useStyles();
  console.log(openWidgets);
  
  return(
    <main className={classes.content} style={{ backgroundImage: (darkState ? ('url(' + DarkBackground + ')') : ('url(' + LightBackground + ')'))}} >
      <div className={classes.toolbar} />
      <Grid container height="100%" spacing={1}>
        {openWidgets.map(widget => (
          <Grid item sm={12} md={6} maxHeight={300}>
            <WidgetCase currentRoleWidgets={currentRoleWidgets} currentWidget={widget} removeWidgetClick={removeWidgetClick} updateWidgetClick={updateWidgetClick}/>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}