import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import UserDrawer from './Drawer';
import Navbar from './Navbar';
import WidgetView from './WidgetView';

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

export default function Dashboard() {
  const [message, setMessage] = useState('Page not found.');
  const classes = useStyles();

  useEffect(() => {
    axios.get('/dashboard')
      .then(res => res.data )
      .then(data => { setMessage('Access granted!'); });
  }, [message]);

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.toolbar} />
      <UserDrawer />
      <WidgetView />
    </div>
  );
}
