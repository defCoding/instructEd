import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, DialogContentText, Button, Grid, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
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
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
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
  const [averageGrade, setAverageGrade] = useState('');
  const studentsRef = useRef([]);
  const gradesRef = useRef([]);
  const submissionsRef = useRef([]);
  const [selectedStudent, setSelectedStudent] = useState({id: -1, first_name: '', last_name: ''});
  const [gOpen, setGopen] = React.useState(false);
  const [submissionsPerStudent, setSubmissionsPerStudent] = useState([]);

  useEffect(() => {
    //get request to retrieve all users who are students of this class
    axios.get(`/courses/${courseID}/students`)
      .then(res => {
        addStudentsToList(res);
      })
      .catch(console.log);

    //get request to retrieve all grades for this assignment

    axios.get(`/assignment/grades/${selectedAssignment.assignment_id}`)
    .then(res => {
      if(res.data.length == 0){
        setAverageGrade('Class Average: Not Availaible');        
      }
      else{
        gradesRef.current = res.data;
        let totalGrade = 0;
        var x;
        for(x of gradesRef.current){
          totalGrade = totalGrade + x.grade;
        }
        setAverageGrade('Class Average: ' + String(totalGrade / gradesRef.current.length) + ' %');
      }
    })
    .catch(console.log);

    
  }, [gOpen, selectedAssignment]); //[open, gOpen, students, selectedStudent, selectedAssignment]

  function addSubmissionsToList(res){
    submissionsRef.current = res.data;
    setSubmissionsPerStudent(submissionsRef.current);
    console.log(submissionsRef.current);
  }


  function addStudentsToList(res){
    studentsRef.current = res.data;
    setStudents(studentsRef.current);
  }

  const studentClicked = (student) => () =>{
    console.log(student);
    if(selectedStudent.id === -1){
      axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.id}`)
      .then(res => {addSubmissionsToList(res)}).catch(console.log);
      //setSubmissionsPerStudent([{file_name: 'file1', url: 'file1'}, {file_name: 'file2', url: 'file2'}]);
      setSelectedStudent(student);
    }
    else if(selectedStudent.id !== -1){
      if(student.id === selectedStudent.id){
        setSubmissionsPerStudent([]);
        submissionsRef.current = [];
        setSelectedStudent({id: -1, first_name: '', last_name: ''});
      }
      else if (selectedStudent.id !== student.id){
        axios.get(`/submissions/assignment/${selectedAssignment.assignment_id}/student/${student.id}`)
        .then(res => {addSubmissionsToList(res)}).catch(console.log);
        //setSubmissionsPerStudent([{file_name: 'file1', url: 'file1'}, {file_name: 'file2', url: 'file2'}]);
        setSelectedStudent(student);
      }
    } 
  }

  const gradeClicked = (student) => () => {
    console.log(student);
    setSelectedStudent(student);
    if(student.id != selectedStudent.id){
      submissionsRef.current = [];
      setSubmissionsPerStudent(submissionsRef.current);
    }
    setGopen(true);
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
        <Typography variant="h6" className={classes.menuButton}>
          {averageGrade}
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
                            <ListItemText primary={name} secondary={"ID: " + id + ", Click to see Submissions"} />
                            <ListItemSecondaryAction>

                                  <Button size="small" className={classes.items} onClick={gradeClicked(student)} variant="contained" color="secondary">
                                    Grade Assignment
                                  </Button>
                                
                              
                            </ListItemSecondaryAction>
                        </ListItem>
                        <List divider={true} className={innerClasses}>
                          {
                            submissionsPerStudent.map((submission) => {
                            if(selectedStudent.id == student.id){
                              let date = moment(submission.time_submitted).local();
                              let dateString = date.format('[Time Submitted:] MM-DD-YY [at] h:mm A');
                            return(<>
                              <ListItem divider={true}>
                                <ListItemText primary={
                                  <a href={submission.url} target="_blank">
                                    <Typography color='secondary'>{submission.file_name}</Typography>
                                  </a>}
                                  secondary={dateString}
                                  ></ListItemText>
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
        <GradingDialog selectedStudent={selectedStudent} selectedAssignment={selectedAssignment} open={gOpen} setOpen={setGopen}/>
  </Dialog>
  );
}

function GradingDialog({selectedStudent, selectedAssignment, open, setOpen}){
  const [newGrade, setNewGrade] = useState('');
  const [studentName, setStudentName] = useState('');
  const [oldGrade, setOldGrade] = useState('');
  useEffect (() => {
    if(selectedStudent.id !== -1){
      setStudentName(selectedStudent.first_name + " " + selectedStudent.last_name);

      axios.get(`/grades/${selectedAssignment.assignment_id}/${selectedStudent.id}`)
      .then(res => {
        console.log(res.data);
        if(res.data.length == 0){
          setOldGrade("Assignment currently ungraded.");
        }
        else{
          setOldGrade(String(res.data[0].grade) + " %");
        }
      }).catch(console.log)
    }

    
  }, [selectedStudent])
/*
  const checkGrade = (gradeList) => {
    console.log(gradeList.data);
    if(gradeList.data.length == 0){
      setOldGrade("Assignment currently ungraded.");
    }
    else{
      setOldGrade(String(gradeList.data[0].grade) + " %");
    }
  }
*/
const handleClose = () => {
  setNewGrade('');
  setOldGrade('');  
  setOpen(false);
};

const handleGradeChange = e => {
  setNewGrade(e.target.value);
}

const setGradeClicked = (student) => () =>{
  var gradeString = newGrade.split('/');
  var givenPoints = parseFloat(gradeString[0]);
  var maxPoints = parseFloat(gradeString[1]);
  var grade = (givenPoints / maxPoints) * 100.0;
  console.log(grade);
  if(oldGrade === "Assignment currently ungraded."){
    axios.post(`/grades/`, {
      userID: student.id,
      assignmentID: selectedAssignment.assignment_id,
      grade: grade
    }).then(res =>{
      if(res.status === 400){
        alert(res.statusText);
      }
      alert('Grade Submitted');
      setNewGrade('');
      setOpen(false);
  })
  }
  else{
    axios.put(`/grades/`, {
      userID: student.id,
      assignmentID: selectedAssignment.assignment_id,
      grade: grade
    }).then(res =>{
      if(res.status === 400){
        alert(res.statusText);
      }
      alert('Grade Updated');
      setNewGrade('');
      setOpen(false);
  })
  }
}


return (
  <Dialog
      open = {open}
      onClose = {handleClose}
      aria-labelledby="grade-dialog-title"
      aria-describedby="grade-dialog-assignment"
  >
      <DialogTitle id="grade-dialog-title">{studentName}</DialogTitle>
      <DialogContent>
          <DialogContentText id="grade-dialog-assignment">
              {oldGrade} 
          </DialogContentText>
          <TextField size="small" color="secondary" multiline="true" variant="standard" helperText="Given Points/Max Possible" label="Change Grade" value={newGrade} name="changegrade" onChange={handleGradeChange} />
      </DialogContent>
      <DialogActions>
          <Button onClick={setGradeClicked(selectedStudent)} color="primary">
              Submit Grade
          </Button>
          <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
      </DialogActions>
  </Dialog>
);
}