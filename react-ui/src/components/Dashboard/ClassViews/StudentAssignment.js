import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Drawer, Divider  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FileUploadTab from './StudentAssignmentTabs/FileUploadTab';
import TextUploadTab from './StudentAssignmentTabs/TextUploadTab';
import LinkUploadTab from './StudentAssignmentTabs/LinkUploadTab';
import SubmissionTab from './StudentAssignmentTabs/SubmissionTab';
import CommentsTab from './StudentAssignmentTabs/CommentsTab';
import GradeTab from './StudentAssignmentTabs/GradeTab';
import axios from 'axios';

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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    padding: theme.spacing(1),
    height: "100vh",
  },
  items: {
    margin: theme.spacing(5),
  },
  panelItems: {
    margin: theme.spacing(1),
  },
}));

function IsSubmitted({submitted, classes, assignmentID}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (submitted) {
    return(
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="bottom">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Grade" {...a11yProps(0)} />
              <Tab label="Comments" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <GradeTab classes={classes} data={{assignmentID}} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommentsTab classes={classes} data={{assignmentID}} />
          </TabPanel>
      </Drawer>
    );
  }
  else {
    return(
      <Drawer 
        className={classes.drawer}
        variant="permanent"
        anchor="bottom">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="File Upload" {...a11yProps(0)} />
              <Tab label="Text Submission" {...a11yProps(1)} />
              <Tab label="Link Submission" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <FileUploadTab classes={classes} data={{assignmentID}}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextUploadTab classes={classes} data={{assignmentID}}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LinkUploadTab classes={classes} data={{assignmentID}}/>
          </TabPanel>
      </Drawer>
    );
  }
}

export default function StudentAssignment({selectedAssignment, open, setOpen}) {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [grade, setGrade] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}`)
      .then(res => {
        if (res.data.length > 0) {
          setSubmitted(true);
        } else {
          setSubmitted(false);
        }
        setSubmissions(res.data);
      }).catch(console.log);

    axios.get(`/grades/${selectedAssignment.assignment_id}`)
      .then(res => setGrade(res.data.grade)).catch(console.log);

    axios.get(`/assignment_files/approved/${selectedAssignment.assignment_id}`)
      .then(res => setFiles(res.data)).catch(console.log);
    }, [selectedAssignment]);

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
          {selectedAssignment.assignment_name}
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container height="100%" spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.items}>{selectedAssignment.assignment_description}</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.items}>
          {submissions.map(s => 
            <a href={s.url} target="_blank">
              <Typography className={classes.items}>
                {s.file_name}
              </Typography>
            </a>
          )}
        </Typography>
        <Divider />
      </Grid>
    </Grid>
    <IsSubmitted submitted={submitted} classes={classes} assignmentID={selectedAssignment.assignment_id} />
  </Dialog>
  );
}