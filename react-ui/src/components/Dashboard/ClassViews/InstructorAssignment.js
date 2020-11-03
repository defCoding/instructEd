import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import moment from 'moment';


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

const useInnerStyles = makeStyles(theme => ({
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
  const innerClasses = useInnerStyles();
  innerClasses.theme.margin.left(3);
  const [students, setStudents] = useState([]);
  const studentsRef = useRef([]);
  let selectedStudent = null;
  const [submissionsPerStudent, setSubmissionsPerStudent] = useState([]);
  const grade = '';

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

  function studentClicked(student){
    if(selectedStudent == null){
      axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.user_id}`)
      .then(res => setSubmissionsPerStudent(res.data)).catch(console.log);
      selectedStudent = student;
    }
    else if(submissionsPerStudent != 0){
      setSubmissionsPerStudent([]);
      axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.user_id}`)
      .then(res => setSubmissionsPerStudent(res.data)).catch(console.log);
      selectedStudent = student;
    }
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
          {selectedAssignment.assignment_name}
        </Typography>
      </Toolbar>
    </AppBar>
    <List>
        {
          students.map((student) => {
            var name = student.first_name + " " + student.last_name;

                    return (<>
                        <ListItem button={true} onClick={studentClicked}>
                            <ListItemText primary={name} secondary={student.user_id} />
                        </ListItem>
                        <List className={innerClasses}>
                          {
                            submissionsPerStudent.map((submission) => {
                            if(submission.user_id == student.user_id){ //Might need to be changed to submission.user_id == selectedStudent.user_id
                              let submissiondate = moment(submission.time_submitted).local();
                              submissiondate = submissiondate.format('[Submitted on] MM-DD-YY [at] h:mm A');
                            return(<>
                              <ListItem>
                                <ListItemText primary={submissiondate} secondary={'Spot for File'}/>
                              </ListItem>
                              <Divider />
                            </>);
                            }
                            })
                          } 
                        </List>
                        <Divider />
                    </>);
                })
            }
        </List>
  </Dialog>
  );
}