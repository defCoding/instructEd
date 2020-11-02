import React from 'react';
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

function IsSubmitted({submitted, classes}) {
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
              <Tab label="Submission" {...a11yProps(0)} />
              <Tab label="Comments" {...a11yProps(1)} />
              <Tab label="Grade" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <SubmissionTab classes={classes} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommentsTab classes={classes} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GradeTab classes={classes} />
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
            <FileUploadTab classes={classes} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TextUploadTab classes={classes} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <LinkUploadTab classes={classes} />
          </TabPanel>
      </Drawer>
    );
  }
}

export default function StudentAssignment({selectedAssignment, open, setOpen}) {
  const classes = useStyles();
  let submitted = false;

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
          {selectedAssignment}
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container height="100%" spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.items}>{selectedAssignment} details here</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.items}>{selectedAssignment} files here</Typography>
        <Divider />
      </Grid>
    </Grid>
    <IsSubmitted submitted={submitted} classes={classes} />
  </Dialog>
  );
}