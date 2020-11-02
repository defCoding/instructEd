import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
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

export default function InstructorAssignment({selectedAssignment, open, setOpen, courseID}) {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const studentsRef = useRef([]);

  useEffect(() => {
    //Place for get request to retrieve all users who are students of this class
    axios.get(`/courses/${courseID}/students`)
      .then(res => {
        addStudentsToList(res);
      })
      .catch(console.log);
  }, []);

  function addStudentsToList(res){
    studentsRef.current = studentsRef.current.concat(res.data);
    setStudents(studentsRef.current);
  }

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
    <List>
        {
          students.map((student) => {
            var name = student.first_name + " " + student.last_name;


            return (<>
              <ListItem>
                <ListItemText primary={name} secondary={student.id} />
              </ListItem>
              <Divider />
            </>);
          })
        }
      </List>
    </Dialog>
  );
}