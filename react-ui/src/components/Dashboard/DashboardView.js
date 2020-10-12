import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserDrawer from './Drawer';
import WidgetView from './WidgetView';
import Navbar from './Navbar';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function WidgetCase() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Navbar />
      <UserDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <WidgetView />
      </main>
    </div>
  );
}