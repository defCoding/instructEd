import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';

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

export default function AssignmentPanel(props) {
  const classes = useStyles();
  const assignments = props.assignments;

  return (
    <Paper className={classes.dialog}>
      <Typography variant="h6">
        Assignments
    </Typography>
      <List>
        {
        assignments.map(assignment => {
          let date = moment(assignment.deadline).local();
          date = date.format('[Due on] MM-DD-YY [at] h:mm A');

          return (
            <ListItem>
              <ListItemText primary={assignment.assignment_name} secondary={date} />
            </ListItem>
          );
        })
        }
      </List>
    </Paper>
  );
}