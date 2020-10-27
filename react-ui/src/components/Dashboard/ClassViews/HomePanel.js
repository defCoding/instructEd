import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';

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

export default function GeneralPanel(props) {
  const classes = useStyles();
  const courseData = props.courseData;
  return (
    <Paper className={classes.dialog}>
      <Typography variant="h5">
        Course Information
      </Typography>
      <Typography variant="h6">
        Term: {courseData.term}
      </Typography>
      <Typography variant="h6">
        Instructors
        <List>
          {
            courseData.instructors.map(instructor => {              
              return (
                <ListItem>
                  <ListItemText primary={instructor} />
                </ListItem>
              )
            })
          }
        </List>
      </Typography>
    </Paper>
  );
}