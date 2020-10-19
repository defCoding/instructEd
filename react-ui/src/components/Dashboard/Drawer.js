import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import moment from 'moment';

const drawerWidth = 250;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
  },
  appBar: {
    position: 'relative',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  dialog: {
    padding: theme.spacing(3),
    height: "100vh",
  }
}));

function GeneralPanel() {
  const classes = useStyles();

  return (
    <Paper className={classes.dialog}>
    <Typography variant="h6">
      Announcements
    </Typography>
    <List>
      <ListItem>
        <ListItemText primary="Announcement 1 Title" secondary="Announcement 1 Body" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Announcement 2 Title" secondary="Announcement 2 Body" />
      </ListItem>
    </List>
    <Typography variant="h6">
      Assignments
    </Typography>
    <List>
      <ListItem>
        <ListItemText primary="Assignment 1 Title" secondary="Assignment 1 Body" />
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText primary="Assignment 2 Title" secondary="Assignment 2 Body" />
      </ListItem>
    </List>
  </Paper>
  );
}

function AssignmentsPanel() {
  const classes = useStyles();

  return (
    <Paper className={classes.dialog}>
    <Typography variant="h6">
      Assignments
    </Typography>
    <List>
     {/* list of assignments */}
    </List>
  </Paper>
  );
}

function AnnouncementsPanel() {
  const classes = useStyles();

  return (
    <Paper className={classes.dialog}>
    <Typography variant="h6">
      Announcements
    </Typography>
    <List>
      {/* list of announcements */}
    </List>
  </Paper>
  );
}

function ClassDialog({selectedClass, open, setOpen}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (selectedClass.id != null) {
      axios.get(`/courses/${selectedClass.id}/announcements`)
        .then(res => {
          console.log(res.data);
          setAnnouncements(res.data);
        })
        .catch(console.log);
      
      axios.get(`/courses/${selectedClass.id}/assignments`)
        .then(res => {
          setAssignments(res.data);
        })
        .catch(console.log);
    }
  }, [selectedClass.id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {selectedClass.name}
        </Typography>
      </Toolbar>
    </AppBar>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Class Information" {...a11yProps(0)} />
        <Tab label="Assignments" {...a11yProps(1)} />
        <Tab label="Announcements" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <GeneralPanel />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <AssignmentsPanel />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <AnnouncementsPanel />
    </TabPanel>
  </Dialog>
  );
}

export default function CurrentDrawer(props) {
  const [selectedClass, setSelectedClass] = React.useState({name: undefined, id: undefined});
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const courses = props.courses;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {courses.map((course) => (
            <ListItem button key={course.course_name} onClick={() => {
              setOpen(true);
              setSelectedClass({name: course.course_name, id: course.course_id});
            }}>
              <Typography color='primary'>{course.course_name}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ClassDialog selectedClass={selectedClass} open={open} setOpen={setOpen} />
    </div>
  );
}