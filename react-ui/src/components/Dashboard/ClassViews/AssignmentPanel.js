import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import moment from 'moment';
import StudentAssignment from './StudentAssignment';
import InstructorAssignment from './InstructorAssignment';
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

function GetAssignmentList(props) {
  if (props.searchValue === '') {
    return (
      <List>
        {props.assignmentList.map(assignment => {
        let date = moment(assignment.deadline).local();
        date = date.format('[Due on] MM-DD-YY [at] h:mm A');
        
        return (
          <ListItem button onClick={() => {
            props.setSelectedAssignment(assignment);
            console.log(props.role);
            console.log(props.selectedAssignment);
            //Check for role before opening
            if(props.role == 0){
              props.setSopen(true);
            }
            else if(props.role == 1){
              props.setIopen(true);
            }
          }}>
            <ListItemText primary={assignment.assignment_name} secondary={date} />
          </ListItem>
        );
      })
      }
    </List>
    );
  }
  else {
    return (
      <List>
        {props.assignmentList.map(assignment => {
          let date = moment(assignment.deadline).local();
          date = date.format('[Due on] MM-DD-YY [at] h:mm A');
          if (assignment.assignment_name.toLowerCase().includes(props.searchValue.toLowerCase()) || 
                date.toLowerCase().includes(props.searchValue.toLowerCase())) {
            return (
              <ListItem button onClick={() => {
                props.setSelectedAssignment(assignment);
                //Check for role before opening
                if(props.role == 0){
                  props.setSopen(true);
                }
                else if(props.role == 1){
                  props.setIopen(true);
                }
              }}>
                <ListItemText primary={assignment.assignment_name} secondary={date} />
              </ListItem>
            );
          }
        })}
      </List>
    );
  }
}

export default function AssignmentPanel(props) {
  const classes = useStyles();
  const assignments = props.assignments;
  const [sopen, setSopen] = React.useState(false);
  const [iopen, setIopen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState({ assignment_name: '', assignment_id: -1, deadline: '', assignment_description: '' });
  const [role, setRole] = React.useState(0);
  var [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    axios.get('/roles')
      .then(res => {
        if (res.data === 'admin') {
          setRole(1);
        } else {
          axios.get(`/roles/course/${props.courseID}`)
            .then(res => {
              if (res.data === 'instructor') {
                setRole(1);
              }
            });
        }
      });
  }, []);

  return (
    <>
      <Paper className={classes.dialog}>
        <Grid container justify="flex-end">
          <TextField label="Search" variant="outlined" color="secondary" onChange={handleSearchChange} />
        </Grid>
        <Typography variant="h6">
          Assignments
        </Typography>
        <GetAssignmentList assignmentList={assignments} searchValue={searchValue} iopen={iopen} sopen={sopen} setSopen={setSopen} setIopen={setIopen} selectedAssignment={selectedAssignment} setSelectedAssignment={setSelectedAssignment} role={role} />
      </Paper>
      <StudentAssignment selectedAssignment={selectedAssignment} open={sopen} setOpen={setSopen} courseID={props.courseID} />
      <InstructorAssignment selectedAssignment={selectedAssignment} open={iopen} setOpen={setIopen} courseID={props.courseID}/>
    </>
  );
}