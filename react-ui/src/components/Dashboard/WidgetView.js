import React from 'react';
import WidgetCase from './WidgetCase';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import LightBackground from './assets/light.jpg';
import DarkBackground from './assets/dark.png';
import AddIcon from '@material-ui/icons/Add';

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
  menuButton: {
    height: '100%',
    width: '100%',
    minHeight: '300px',
    minWidth: '300px',
  },
  icon: {
    minHeight: '150px',
    minWidth: '150px',
  },
}));

export default function WidgetView({currentRoleWidgets, darkState, addWidgetClick, removeWidgetClick, openWidgets, updateWidgetClick}) {
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
        <Grid item sm={12} md={6} maxHeight={300}>
          <IconButton
            color="secondary"
            onClick={addWidgetClick}
            className={classes.menuButton} >
            <AddIcon className={classes.icon}/>
          </IconButton>
        </Grid>
      </Grid>
    </main>
  );
}