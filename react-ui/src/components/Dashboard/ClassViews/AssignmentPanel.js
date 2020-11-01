import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItemText, Paper, ListItem, Typography } from '@material-ui/core';
import moment from 'moment';
import StudentAssignment from './StudentAssignment';
import InstructorAssignment from './InstructorAssignment';

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

export default function AssignmentPanel(props) {
  const classes = useStyles();
  const assignments = props.assignments;
  const [sopen, setSopen] = React.useState(false);
  const [iopen, setIopen] = React.useState(false);
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);
  var role = 1; // 0 for non-instructor, 1 for instructor

  useEffect(() => {
    //Determine the role for the given class
    //If instructor set role to 1, if admin or student set role to 0
  });

  return (
    <>
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
              <ListItem onClick={() => {
                //Check for role before opening
                if(role == 0){
                  setSopen(true);
                }
                else if(role == 1){
                  setIopen(true);
                }
                setSelectedAssignment(assignment.assignment_name);
              }}>
                <ListItemText primary={assignment.assignment_name} secondary={date} />
              </ListItem>
            );
          })
          }
        </List>
      </Paper>
      <StudentAssignment selectedAssignment={selectedAssignment} open={sopen} setOpen={setSopen} courseID={props.courseID} />
      <InstructorAssignment selectedAssignment={selectedAssignment} open={iopen} setOpen={setIopen} courseID={props.courseID}/>
    </>
  );
}