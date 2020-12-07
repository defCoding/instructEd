import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, IconButton, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import HomePanel from './ClassViews/HomePanel';
import AnnouncementPanel from './ClassViews/AnnouncementPanel';
import AssignmentPanel from './ClassViews/AssignmentPanel';
import FilePanel from './ClassViews/FilePanel';
import LecturePanel from './ClassViews/LecturePanel';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

export default function ClassDialog({ selectedClass, open, setOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [courseData, setCourseData] = React.useState({instructors: [], course_id: -1});
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (selectedClass.id != null) {
      axios.get(`/courses/${selectedClass.id}`)
        .then(res => {
          setCourseData(res.data);
        })
        .catch(console.log);

      axios.get(`/courses/${selectedClass.id}/announcements`)
        .then(res => {
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
          <Typography variant="h6"s>
            {selectedClass.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Class Information" {...a11yProps(0)} />
          <Tab label="Assignments" {...a11yProps(1)} />
          <Tab label="Announcements" {...a11yProps(2)} />
          <Tab label="Files" {...a11yProps(3)} />
          <Tab label="Lectures" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomePanel courseData={courseData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssignmentPanel assignments={assignments} courseID={selectedClass.id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AnnouncementPanel announcements={announcements} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FilePanel courseID={selectedClass.id}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <LecturePanel courseID={selectedClass.id}/>
      </TabPanel>
    </Dialog>
  );
}