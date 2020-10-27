import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import HomePanel from './ClassViews/HomePanel';
import AnnouncementPanel from './ClassViews/AnnouncementPanel';
import AssignmentPanel from './ClassViews/AssignmentPanel';

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

function ClassDialog({ selectedClass, open, setOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [courseData, setCourseData] = React.useState({instructors: []});
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (selectedClass.id != null) {
      axios.get(`/courses/${selectedClass.id}`)
        .then(res => {
          console.log(res.data);
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
        <HomePanel courseData={courseData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AssignmentPanel assignments={assignments} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AnnouncementPanel announcements={announcements} />
      </TabPanel>
    </Dialog>
  );
}