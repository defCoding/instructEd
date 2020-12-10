import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import UserDrawer from './Drawer';
import Navbar from './Navbar';
import WidgetView from './WidgetView';
import axios from 'axios';
import useLocalStorage from '../../useLocalStorage';

const drawerWidth = 250;

const adminWidgets = ['Add Course', 'Add User to Class', 'Set Role', 'Unapproved Files', 'Search'];
const studentWidgets = ['Announcements', 'Assignments', 'Calendar'];
const instructorWidgets = ['Announcements', 'Assignments', 'Calendar', 'Create Announcement', 'Create Assignment'];
let currentOpenWidgets = [];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
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
  const [currentRoleWidgets, setCurrentRoleWidgets] = useState(studentWidgets);

  var initialWidgets = [];
  for (var i = 0; i < currentRoleWidgets.length; i++) {
    initialWidgets.push({posn: i, name: currentRoleWidgets[i]});
  }

  const [openWidgets, setOpenWidgets] = useLocalStorage('widgets', initialWidgets);
  const coursesRef = useRef([]);

  function addWidgetClick() {
    var posn;
    if (openWidgets.length === 0) {
      posn = 0;
    }
    else {
      posn = openWidgets[openWidgets.length - 1].posn + 1;
    }
    var name = currentRoleWidgets[0];
    var newWidget = [{posn, name}];
    setOpenWidgets(openWidgets.concat(newWidget));
  }

  function removeWidgetClick(posn) {
    var firstHalf = openWidgets.slice(0, posn);
    var lastHalf = openWidgets.slice(posn + 1, openWidgets.length);
    lastHalf.map(widget => (widget.posn = widget.posn - 1));
    setOpenWidgets(firstHalf.concat(lastHalf));
  }

  function updateWidgetClick(name, posn) {

    var oldFirstHalf = openWidgets.slice(0, posn);
    var newWidget = [{posn, name}];
    var firstHalf = oldFirstHalf.concat(newWidget);
    var lastHalf = openWidgets.slice(posn + 1, openWidgets.length);

    setOpenWidgets(firstHalf.concat(lastHalf));
  }

  function getCoursesFromResponse(res) {
    coursesRef.current = coursesRef.current.concat(res.data);
    setCourses(coursesRef.current);
  }

  useEffect(() => {
    axios.get('/course_files/')
      .catch(console.log)
  }, []);

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        switch (res.data) {
          case 'admin':
            setCurrentRoleWidgets(adminWidgets);
            axios.get('/courses').then(getCoursesFromResponse);
            break;
          case 'instructor':
            setCurrentRoleWidgets(instructorWidgets);
            axios.get('/courses/instructor').then(getCoursesFromResponse);
            break;
          case 'student':
            setCurrentRoleWidgets(studentWidgets);
            axios.get('/courses/instructor').then(res => {
              if (res.data.length != 0) {
                setCurrentRoleWidgets(instructorWidgets);
              }
              getCoursesFromResponse(res);
            });
            axios.get('/courses/student').then(getCoursesFromResponse);
            break;
          default:
            throw new Error('Invalid role.');
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) { 
          props.history.push('/login');
        } else {
          console.log(err);
        }
      });
  }, []);

  return (
    <Paper className={classes.root}>
      <Navbar darkState={props.darkState} handleThemeChange={props.handleThemeChange} addWidgetClick={addWidgetClick} />
      <div className={classes.toolbar} />
      <UserDrawer courses={courses}/>
      <WidgetView currentRoleWidgets={currentRoleWidgets} darkState={props.darkState} addWidgetClick={addWidgetClick} removeWidgetClick={removeWidgetClick} openWidgets={openWidgets} updateWidgetClick={updateWidgetClick}/>
    </Paper>
  );
}
