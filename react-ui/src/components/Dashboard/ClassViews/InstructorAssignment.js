import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


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

export default function InstructorAssignment({selectedAssignment, open, setOpen}) {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState(new Map());
  const [submissions, setSubmissions] = useState(new Map());

  useEffect(() => {
    //Place for get request to retrieve all users who are students of this class, and to map the grades and submissions to their user ids
  });

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
  </Dialog>
  );
}