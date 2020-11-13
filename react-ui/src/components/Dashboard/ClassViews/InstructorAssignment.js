import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Divider, Button, Grid } from '@material-ui/core';
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
    margin: theme.spacing(1, 2)
  },
}));

export default function InstructorAssignment({selectedAssignment, open, setOpen, courseID}) {
  const classes = useStyles();
  const innerClasses = useInnerStyles();
  const [students, setStudents] = useState([]);
  const studentsRef = useRef([]);
  const submissionsRef = useRef([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [submissionsPerStudent, setSubmissionsPerStudent] = useState([]);
  const [newGrade, setNewGrade] = useState('');

  useEffect(() => {
    //Place for get request to retrieve all users who are students of this class
    axios.get(`/courses/${courseID}/students`)
      .then(res => {
        addStudentsToList(res);
      })
      .catch(console.log);
  }, []);
  /*
  function addSubmissionsToList(res){
    submissionsRef.current = submissionsRef.current.concat(res.data);
    setSubmissionsPerStudent(submissionsRef.current);
  }
*/

  const handleGradeChange = e => {
    setNewGrade(e.target.value);
  }
  function addStudentsToList(res){
    studentsRef.current = studentsRef.current.concat(res.data);
    setStudents(studentsRef.current);
  }

  const setGradeClicked = (student) => () =>{
    var gradeString = newGrade.split('/');
    var givenPoints = parseFloat(gradeString[0]);
    var maxPoints = parseFloat(gradeString[1]);
    var grade = (givenPoints / maxPoints) * 100;
    console.log(grade);
    axios.post(`/grades/`, {
      user_id: student.id,
      assignment_id: selectedAssignment.assignment_id,
      grade: grade
    }).then(res =>{
      if(res.status === 400){
        alert(res.statusText);
      }
    })
  }

  const studentClicked = (student) => () =>{
    //console.log(student.id);
    if(selectedStudent == null){
      //axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.id}`)
      //.then(res => {setSubmissionsPerStudent(res.data)}).catch(console.log);
      setSubmissionsPerStudent([{file_name: 'file1', url: 'url'}, {file_name: 'file2', url: 'url'}]);
      setSelectedStudent(student);
      console.log(submissionsPerStudent);
    }
    else if(selectedStudent != null){
      if(student.id == selectedStudent.id){
        setSubmissionsPerStudent([]);
        setSelectedStudent(null);
        console.log(submissionsPerStudent);
      }
      else{
        //axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.id}`)
        //.then(res => {setSubmissionsPerStudent(res.data)}).catch(console.log);
        setSubmissionsPerStudent([{file_name: 'file1', url: 'url'}, {file_name: 'file2', url: 'url'}]);
        setSelectedStudent(student);
        console.log(submissionsPerStudent);
      }
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
            var id = String(student.id);

                    return (<>
                        <ListItem className={classes.items} divider={true} button={true} onClick={studentClicked(student)}>
                            <ListItemText primary={name} secondary={id} />
                            <ListItemSecondaryAction>
                              <Grid
                              className={classes.items}
                              container
                              spacing={5}
                              direction="row"
                              justify="space-between"
                              alignItems="center"
                              >
                                
                                  <TextField className={classes.items} size="small" color="secondary" multiline="true" variant="standard" /*helperText="Given Points/Max Possible"*/ label="Change Grade" value={newGrade} name="changegrade" onChange={handleGradeChange} />
                               
                                  <Divider orientation="vertical" flexItem/>
                                
                                  <Button size="small" className={classes.items} onClick={setGradeClicked(student)} variant="contained" color="secondary">
                                    Submit Grade
                                  </Button>
                                
                              </Grid>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <List className={innerClasses}>
                          {
                            submissionsPerStudent.map((submission) => {
                            if(selectedStudent.id == student.id){ //Might need to be changed to submission.user_id == selectedStudent.user_id
                            return(<>
                              <ListItem divider={true}>
                                <ListItemText primary={submission.file_name} secondary={submission.url}/>
                              </ListItem>
                            </>);
                            }
                            })
                          } 
                        </List>
                    </>);
                })
            }
        </List>
  </Dialog>
  );
}