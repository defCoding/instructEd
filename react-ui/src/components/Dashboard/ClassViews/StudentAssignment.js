import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Box, Tabs, Tab, Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Drawer, Divider  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

  const onFileSubmit = (event) => {
    alert('file')
  };

  const onTextSubmit = (event) => {
    alert('text')
  };

  const onLinkSubmit = (event) => {
    alert('link')
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
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Submission</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Uploaded files or text submission</Typography>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Comments</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Comments from professor on grade here.</Typography>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Grade</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h2" className={classes.panelItems}>90/100</Typography>
                </Grid>
              </Grid>
            </Box>
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
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>File Upload</Typography>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.panelItems} variant="contained" color="secondary" onClick={onFileSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Text Submission</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    className={classes.panelItems}
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button className={classes.panelItems} variant="contained" color="secondary" onClick={onTextSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box height={250}>
              <Grid container height="100%" spacing={1}>
                <Grid item xs={12}>
                  <Typography className={classes.panelItems}>Link Submission</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="outlined-basic" label="Link" variant="outlined" className={classes.panelItems}/>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="secondary" className={classes.panelItems} onClick={onLinkSubmit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
      </Drawer>
    );
  }
}

export default function StudentAssignment({selectedAssignment, open, setOpen}) {
  const classes = useStyles();
  let submitted = true;

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