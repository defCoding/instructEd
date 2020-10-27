import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tabs, Tab, List, ListItemText, Paper, IconButton, Drawer, Divider, ListItem, Typography, Dialog, AppBar, Toolbar } from '@material-ui/core';
import ClassDialog from './ClassDialog';

const drawerWidth = 250;

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

export default function CurrentDrawer(props) {
  const [selectedClass, setSelectedClass] = React.useState({ name: undefined, id: undefined });
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
              setSelectedClass({ name: course.course_name, id: course.course_id });
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