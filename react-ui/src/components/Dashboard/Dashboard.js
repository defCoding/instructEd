import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserDrawer from './Drawer';
import Navbar from './Navbar';
import WidgetView from './WidgetView';
import axios from 'axios';

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
  const classes = useStyles();

  let [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            axios.get('/courses').then(getCoursesFromResponse);
            break;
          case 'instructor':
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            break;
          case 'student':
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            axios.get('/courses/student').then(getCoursesFromResponse);
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(err => console.log(err));
  }, []);

  function getCoursesFromResponse(res) {
    setCourses(courses.concat(res.data));
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.toolbar} />
      <UserDrawer courses={courses}/>
      <WidgetView />
    </div>
  );
}
