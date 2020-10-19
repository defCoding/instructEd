import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserDrawer from './Drawer';
import Navbar from './Navbar';
import WidgetView from './WidgetView';
import axios from 'axios';

const drawerWidth = 250;

const adminWidgets = ['Add Course', 'Add User to Class', 'Set Role'];
const instructorWidgets = ['Create Announcement', 'Calendar'];
const studentWidgets = ['Announcements', 'Assignments', 'Calendar'];
let currentRoleWidgets = [];

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

export default function Dashboard(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const coursesRef = useRef([]);

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            currentRoleWidgets = adminWidgets;
            axios.get('/courses').then(getCoursesFromResponse);
            break;
          case 'instructor':
            currentRoleWidgets = instructorWidgets;
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            break;
          case 'student':
            currentRoleWidgets = studentWidgets;
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            axios.get('/courses/student').then(getCoursesFromResponse);
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(err => {
        if (err.response.status === 401) { 
          props.history.push('/login');
        } else {
          console.log(err);
        }
      });
  }, []);

  function getCoursesFromResponse(res) {
    coursesRef.current = coursesRef.current.concat(res.data);
    setCourses(coursesRef.current);
  }

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.toolbar} />
      <UserDrawer courses={courses}/>
      <WidgetView displayWidgets={currentRoleWidgets}/>
    </div>
  );
}